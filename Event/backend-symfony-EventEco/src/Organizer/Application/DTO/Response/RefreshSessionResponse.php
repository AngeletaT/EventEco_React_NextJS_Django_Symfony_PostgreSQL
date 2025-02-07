<?php

namespace App\Organizer\Application\DTO\Response;

class RefreshSessionResponse
{
    /**
     * Datos del organizer (por ejemplo, id, email, etc.) sin incluir el refresh token.
     *
     * @var array
     */
    private array $organizer;

    /**
     * El access token, ya sea el antiguo (si sigue siendo válido) o uno nuevo generado.
     *
     * @var string
     */
    private string $accessToken;

    public function __construct(array $organizer, string $accessToken)
    {
        $this->organizer = $organizer;
        $this->accessToken = $accessToken;
    }

    public function getOrganizer(): array
    {
        return $this->organizer;
    }

    public function getAccessToken(): string
    {
        return $this->accessToken;
    }
}