<?php

namespace App\Organizer\Application\UseCase\Command\RefreshSession;

class RefreshSessionCommand
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