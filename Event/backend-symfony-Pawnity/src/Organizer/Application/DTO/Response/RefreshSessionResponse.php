<?php

namespace App\Organizer\Application\DTO\Response;

class RefreshSessionResponse
{
    /**
     * Datos del organizer (por ejemplo, id, email, etc.) sin incluir el refresh token.
     *
     * @var string
     */
    private string $email;

    /**
     * El access token, ya sea el antiguo (si sigue siendo válido) o uno nuevo generado.
     *
     * @var string
     */
    private string $accessToken;
    private string $nif;

    public function __construct(string $email, string $nif, string $accessToken)
    {
        $this->email = $email;
        $this->accessToken = $accessToken;
        $this->nif = $nif;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getNif(): string
    {
        return $this->nif;
    }

    public function getAccessToken(): string
    {
        return $this->accessToken;
    }
}