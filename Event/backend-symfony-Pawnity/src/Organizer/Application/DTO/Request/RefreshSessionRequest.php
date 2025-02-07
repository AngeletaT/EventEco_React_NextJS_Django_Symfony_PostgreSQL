<?php

namespace App\Organizer\Application\DTO\Request;

class RefreshSessionRequest
{
    private string $accessToken;

    public function __construct(string $accessToken)
    {
        $this->accessToken = $accessToken;
    }

    public function getAccessToken(): string
    {
        return $this->accessToken;
    }
}