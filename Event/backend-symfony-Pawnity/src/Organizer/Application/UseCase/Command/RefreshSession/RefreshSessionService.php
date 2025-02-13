<?php

namespace App\Organizer\Application\UseCase\Command\RefreshSession;

use App\Organizer\Application\DTO\Request\RefreshSessionRequest;
use App\Organizer\Application\DTO\Response\RefreshSessionResponse;
use App\Organizer\Application\UseCase\InPort\RefreshSessionInterface;
use App\Organizer\Domain\OutPort\OrganizerRepositoryInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use App\Organizer\Infrastructure\Security\RefreshTokenGenerator;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use App\Organizer\Infrastructure\Security\OrganizerSecurityAdapter;

class RefreshSessionService implements RefreshSessionInterface
{
    private JWTTokenManagerInterface $jwtManager;
    private OrganizerRepositoryInterface $organizerRepository;
    private RefreshTokenGenerator $refreshTokenGenerator;
    private string $jwtSecret;      // Se usa para refresh token (HS256)
    private string $jwtPublicKey;   // Se usa para access token (RS256)

    public function __construct(
        JWTTokenManagerInterface $jwtManager,
        OrganizerRepositoryInterface $organizerRepository,
        RefreshTokenGenerator $refreshTokenGenerator,
        string $jwtSecret,
        string $jwtPublicKey
    ) {
        $this->jwtManager = $jwtManager;
        $this->organizerRepository = $organizerRepository;
        $this->refreshTokenGenerator = $refreshTokenGenerator;
        $this->jwtSecret = $jwtSecret;
        // Si la variable $jwtPublicKey comienza con "file://", leemos el contenido del archivo.
        if (strpos($jwtPublicKey, 'file://') === 0) {
            $path = substr($jwtPublicKey, 7);
            $this->jwtPublicKey = file_get_contents($path);
        } else {
            $this->jwtPublicKey = $jwtPublicKey;
        }
        // Para depuración, puedes usar dump($this->jwtPublicKey) (en entorno dev) y confirmar que contiene el contenido de la clave.
        // dump($this->jwtPublicKey);
    }

    /**
     * Ejecuta la lógica de refresco de sesión.
     *
     * @param RefreshSessionRequest $request
     * @return RefreshSessionResponse
     * @throws \Exception Si el token es inválido, el organizador no existe o la sesión ha expirado.
     */
    public function refresh(RefreshSessionRequest $request): RefreshSessionResponse
    {
        $accessToken = $request->getAccessToken();
        $now = time();
        $tokenValid = false;
        $decoded = null;

        // 1. Intentar decodificar el access token usando la clave pública y RS256
        try {
            $decoded = JWT::decode($accessToken, new Key($this->jwtPublicKey, 'RS256'));
            // dump($decoded);
            $tokenValid = true;
        } catch (ExpiredException $e) {
            // Si el token ha expirado, decodificamos manualmente el payload para extraer los datos
            $decoded = $this->decodePayload($accessToken);
            $tokenValid = false;
        } catch (\Exception $e) {
            throw new \Exception('Token inválido: ' . $e->getMessage());
        }

        // 2. Si el access token sigue vigente, se devuelve la sesión actual
        if ($tokenValid) {
            $organizerId = $decoded->username ?? null;
            if (!$organizerId) {
                throw new \Exception('Token inválido: falta identificador');
            }
            $organizer = $this->organizerRepository->findById($organizerId);
            if (!$organizer) {
                throw new \Exception('Organizador no encontrado');
            }

            $email = $organizer->getEmail();
            $nif = $organizer->getNif();
                
            return new RefreshSessionResponse($email, $nif, $accessToken);
        }

        // 3. Si el access token ha expirado, validar el refresh token almacenado (HS256)
        $organizerId = $decoded->sub ?? null;
        if (!$organizerId) {
            throw new \Exception('Token inválido: falta identificador');
        }

        $organizer = $this->organizerRepository->findById($organizerId);
        if (!$organizer) {
            throw new \Exception('Organizador no encontrado');
        }

        $storedRefreshToken = $organizer->getRefreshToken();
        if (!$storedRefreshToken) {
            throw new \Exception('Sesión expirada');
        }

        try {
            $refreshDecoded = JWT::decode($storedRefreshToken, new Key($this->jwtSecret, 'HS256'));
            if (($refreshDecoded->exp ?? 0) < $now) {
                throw new \Exception('Sesión expirada');
            }
        } catch (\Exception $e) {
            throw new \Exception('Sesión expirada');
        }

        // 4. Generar un nuevo access token utilizando el adaptador
        $organizerAdapter = new OrganizerSecurityAdapter($organizer);
        $newAccessToken = $this->jwtManager->create($organizerAdapter);

        $email = $organizer->getEmail();
        $nif = $organizer->getNif();

        return new RefreshSessionResponse($email, $nif, $newAccessToken);
    }

    /**
     * Decodifica el payload de un JWT sin verificar la firma ni la expiración.
     *
     * @param string $jwt
     * @return \stdClass|null
     */
    private function decodePayload(string $jwt): ?\stdClass
    {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            return null;
        }
        $payload = $parts[1];
        $decodedPayload = base64_decode(strtr($payload, '-_', '+/'));
        if (!$decodedPayload) {
            return null;
        }
        return json_decode($decodedPayload);
    }
}