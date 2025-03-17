<?php
// src/Pet/Application/DTO/Request/TogglePetActiveRequest.php

namespace App\Pet\Application\DTO\Request;

use App\Pet\Application\UseCase\Command\TogglePetActive\TogglePetActiveCommand;

class TogglePetActiveRequest
{
    private string $uuid;
    private bool $isActive;

    public function __construct(string $uuid, bool $isActive)
    {
        $this->uuid = $uuid;
        $this->isActive = $isActive;
    }

    public function toCommand(): TogglePetActiveCommand
    {
        return new TogglePetActiveCommand($this->uuid, $this->isActive);
    }
}
