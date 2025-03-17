<?php
// src/Pet/Application/UseCase/Command/TogglePetActive/TogglePetActiveCommand.php

namespace App\Pet\Application\UseCase\Command\TogglePetActive;

class TogglePetActiveCommand
{
    private string $uuid;

    public function __construct(string $uuid)
    {
        $this->uuid = $uuid;
    }

    public function getUuid(): string
    {
        return $this->uuid;
    }
}
