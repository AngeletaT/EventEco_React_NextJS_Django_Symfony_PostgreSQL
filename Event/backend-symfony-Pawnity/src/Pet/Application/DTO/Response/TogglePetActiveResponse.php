<?php
// src/Pet/Application/DTO/Response/TogglePetActiveResponse.php

namespace App\Pet\Application\DTO\Response;

class TogglePetActiveResponse
{
    private string $uuid;
    private bool $isActive;
    private string $message;

    public function __construct(string $uuid, bool $isActive)
    {
        $this->uuid = $uuid;
        $this->isActive = $isActive;
        $this->message = $isActive ? "Pet activated successfully." : "Pet deactivated successfully.";
    }

    public function getUuid(): string
    {
        return $this->uuid;
    }

    public function getIsActive(): bool
    {
        return $this->isActive;
    }

    public function getMessage(): string
    {
        return $this->message;
    }
}
