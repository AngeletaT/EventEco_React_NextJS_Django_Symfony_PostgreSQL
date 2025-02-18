<?php

namespace App\Event\Application\DTO\Response;

class ToggleSubEventResponse
{
    private int $idSubEvent;
    private bool $isActive;

    public function __construct(int $idSubEvent, bool $isActive)
    {
        $this->idSubEvent = $idSubEvent;
        $this->isActive = $isActive;
    }

    public function getIdSubEvent(): int
    {
        return $this->idSubEvent;
    }

    public function isActive(): bool
    {
        return $this->isActive;
    }
}