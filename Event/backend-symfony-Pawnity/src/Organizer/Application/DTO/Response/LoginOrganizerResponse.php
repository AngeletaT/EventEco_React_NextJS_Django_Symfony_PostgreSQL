<?php

namespace App\Organizer\Application\DTO\Response;

class LoginOrganizerResponse
{
    private string $accessToken;
    private string $refreshToken;

    public function __construct(string $accessToken, string $refreshToken)
    {
        $this->accessToken  = $accessToken;
        $this->refreshToken = $refreshToken;
    }

    public function getAccessToken(): string
    {
        return $this->accessToken;
    }

    public function getRefreshToken(): string
    {
        return $this->refreshToken;
    }
}