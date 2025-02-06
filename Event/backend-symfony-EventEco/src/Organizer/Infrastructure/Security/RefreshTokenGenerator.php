<?php

namespace App\Organizer\Infrastructure\Security;

use App\Organizer\Domain\Entity\Organizer;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use DateTimeImmutable;

class RefreshTokenGenerator
{
    private string $secret;
    private int $ttl;

    public function __construct(string $secret, int $ttl = 604800)
    {
        $this->secret = $secret;
        $this->ttl = $ttl;
    }

    public function generateToken(Organizer $organizer): string
    {
        $now = new DateTimeImmutable();
        $exp = $now->modify("+{$this->ttl} seconds")->getTimestamp();

        $payload = [
            'sub'   => $organizer->getIdOrg(),
            'email' => $organizer->getEmail(),
            'iat'   => $now->getTimestamp(),
            'exp'   => $exp,
        ];

        return JWT::encode($payload, $this->secret, 'HS256');
    }

    public function decodeToken(string $token): ?object
    {
        try {
            $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
            if (is_array($decoded)) {
                return (object)$decoded;
            }
            return $decoded;
        } catch (\Exception $e) {
            return null;
        }
    }
}