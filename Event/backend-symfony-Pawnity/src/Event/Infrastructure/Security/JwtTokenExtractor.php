<?php

declare(strict_types=1);

namespace App\Event\Infrastructure\Security;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtTokenExtractor
{
    private string $publicKey;
    private string $projectDir;

    public function __construct(string $publicKey, string $projectDir)
    {
        $this->publicKey = $publicKey;
        $this->projectDir = $projectDir;
    }

    /**
     * Extrae el orgId (almacenado en el claim "username") a partir del header Authorization.
     *
     * @param string|null $authorizationHeader
     * @return int
     * @throws \InvalidArgumentException
     */
    public function extractOrgIdFromToken(?string $authorizationHeader): int
    {
        if (!$authorizationHeader) {
            throw new \InvalidArgumentException('Token no proporcionado');
        }

        // Extrae el token eliminando el prefijo "Bearer " si existe.
        $jwt = (strpos($authorizationHeader, 'Bearer ') === 0)
            ? substr($authorizationHeader, 7)
            : $authorizationHeader;

        $publicKey = $this->resolvePublicKey();

        $decoded = JWT::decode($jwt, new Key($publicKey, 'RS256'));
        $decodedArray = (array)$decoded;
        if (!isset($decodedArray['username'])) {
            throw new \InvalidArgumentException('Token inválido, no contiene "username".');
        }
        return (int)$decodedArray['username'];
    }

    /**
     * Resuelve la clave pública. Si la clave comienza con "file://", se lee el contenido del archivo.
     *
     * @return string
     * @throws \InvalidArgumentException
     */
    private function resolvePublicKey(): string
    {
        if (strpos($this->publicKey, 'file://') === 0) {
            $path = substr($this->publicKey, 7);
            // Reemplaza el placeholder %kernel.project_dir% si es necesario
            $path = str_replace('%kernel.project_dir%', $this->projectDir, $path);
            $publicKey = file_get_contents($path);
            if ($publicKey === false) {
                throw new \InvalidArgumentException("No se pudo leer la clave pública desde la ruta: $path");
            }
            return $publicKey;
        }
        return $this->publicKey;
    }
}