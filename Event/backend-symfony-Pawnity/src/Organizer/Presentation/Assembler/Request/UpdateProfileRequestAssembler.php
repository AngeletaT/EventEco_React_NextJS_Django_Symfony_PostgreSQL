<?php

declare(strict_types=1);

namespace App\Organizer\Presentation\Assembler\Request;

use App\Organizer\Application\DTO\Request\UpdateProfileRequest;
use Symfony\Component\HttpFoundation\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class UpdateProfileRequestAssembler
{
    private string $projectDir;

    public function __construct(string $projectDir)
    {
        $this->projectDir = $projectDir;
    }

    public function fromHttpRequest(Request $request): UpdateProfileRequest
    {
        // Extraer el token JWT del header Authorization
        $authorizationHeader = $request->headers->get('Authorization');
        if (null === $authorizationHeader) {
            throw new \InvalidArgumentException('No se encontró el header Authorization.');
        }
        if (strpos($authorizationHeader, 'Bearer ') === 0) {
            $jwt = substr($authorizationHeader, 7);
        } else {
            $jwt = $authorizationHeader;
        }
        // Obtener la clave pública desde la variable de entorno
        $jwtPublicKey = $_ENV['JWT_PUBLIC_KEY'] ?? null;
        if (null === $jwtPublicKey) {
            throw new \InvalidArgumentException('JWT_PUBLIC_KEY no configurado.');
        }
        if (strpos($jwtPublicKey, 'file://') === 0) {
            $path = substr($jwtPublicKey, 7);
            if (strpos($path, '%kernel.project_dir%') !== false) {
                // Usamos el valor inyectado en $this->projectDir o desde $_ENV['KERNEL_PROJECT_DIR']
                $projectDir = $_ENV['KERNEL_PROJECT_DIR'] ?? $this->projectDir;
                $path = str_replace('%kernel.project_dir%', $projectDir, $path);
            }
            $publicKey = file_get_contents($path);
            if (false === $publicKey) {
                throw new \InvalidArgumentException("No se pudo leer la clave pública desde la ruta: {$path}");
            }
        } else {
            $publicKey = $jwtPublicKey;
        }

        try {
            $decoded = JWT::decode($jwt, new Key($publicKey, 'RS256'));
            $decodedArray = (array) $decoded;
        } catch (\Exception $e) {
            throw new \InvalidArgumentException('Token inválido: ' . $e->getMessage());
        }

        if (!isset($decodedArray['username'])) {
            throw new \InvalidArgumentException('El token no contiene el campo "username".');
        }
        $idOrg = (int)$decodedArray['username'];

        // Leer el cuerpo de la request (JSON) para obtener los campos a actualizar.
        $data = json_decode($request->getContent(), true);
        if (null === $data) {
            $data = [];
        }

        $name = $data['name'] ?? null;
        $address = $data['address'] ?? null;
        $urlLogo = $data['urlLogo'] ?? null;
        $description = $data['description'] ?? null;
        $urlWeb = $data['urlWeb'] ?? null;
        $urlImage = $data['urlImage'] ?? null;

        return new UpdateProfileRequest($idOrg, $name, $address, $urlLogo, $description, $urlWeb, $urlImage);
    }
}