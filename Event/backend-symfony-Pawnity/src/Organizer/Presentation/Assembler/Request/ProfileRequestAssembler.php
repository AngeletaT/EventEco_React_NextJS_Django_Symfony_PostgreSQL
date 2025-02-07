<?php

declare(strict_types=1);

namespace App\Organizer\Presentation\Assembler\Request;

use App\Organizer\Application\DTO\Request\ProfileRequest;
use Symfony\Component\HttpFoundation\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ProfileRequestAssembler
{
    private string $projectDir;

    public function __construct(string $projectDir)
    {
        $this->projectDir = $projectDir;
    }

    public function fromHttpRequest(Request $request): ProfileRequest
    {
        // Extraer el token JWT del header Authorization
        $authorizationHeader = $request->headers->get('Authorization');
        if (null === $authorizationHeader) {
            throw new \InvalidArgumentException('No se encontró el header Authorization.');
        }
        // Remover el prefijo "Bearer " si está presente
        if (strpos($authorizationHeader, 'Bearer ') === 0) {
            $jwt = substr($authorizationHeader, 7);
        } else {
            $jwt = $authorizationHeader;
        }
        #dump('JWT extraído:', $jwt);

        // Obtener la variable de entorno con la clave pública
        $jwtPublicKey = $_ENV['JWT_PUBLIC_KEY'] ?? null;
        if (null === $jwtPublicKey) {
            throw new \InvalidArgumentException('La variable de entorno JWT_PUBLIC_KEY no está configurada.');
        }

        // Si la clave comienza con "file://", se lee el contenido del archivo
        if (strpos($jwtPublicKey, 'file://') === 0) {
            // Extraer la ruta quitando el prefijo "file://"
            $path = substr($jwtPublicKey, 7);
            #dump('Ruta original:', $path);

            // Si la ruta contiene el placeholder %kernel.project_dir%, se reemplaza
            if (strpos($path, '%kernel.project_dir%') !== false) {
                #dump('Valor inyectado de kernel.project_dir:', $this->projectDir);
                $path = str_replace('%kernel.project_dir%', $this->projectDir, $path);
            }
            #dump('Ruta final para la clave pública:', $path);

            // Se lee el contenido del archivo con la clave pública
            $publicKey = file_get_contents($path);
            if (false === $publicKey) {
                throw new \InvalidArgumentException("No se pudo leer la clave pública desde la ruta: {$path}");
            }
        } else {
            $publicKey = $jwtPublicKey;
        }

        // Decodificar el token JWT usando la clave pública y el algoritmo RS256
        try {
            $decoded = JWT::decode($jwt, new Key($publicKey, 'RS256'));
            $decodedArray = (array)$decoded;
        } catch (\Exception $e) {
            throw new \InvalidArgumentException('Token inválido: ' . $e->getMessage());
        }

        // Se asume que el claim "username" contiene el idOrg
        if (!isset($decodedArray['username'])) {
            throw new \InvalidArgumentException('El token no contiene el campo "username".');
        }
        $idOrg = (int)$decodedArray['username'];
        #dump('idOrg extraído del token:', $idOrg);

        return new ProfileRequest($idOrg);
    }
}