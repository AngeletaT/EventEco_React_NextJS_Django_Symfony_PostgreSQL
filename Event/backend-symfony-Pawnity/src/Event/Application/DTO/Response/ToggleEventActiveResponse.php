<?php

namespace App\Event\Application\DTO\Response;

class ToggleEventActiveResponse
{
    private int $eventId;
    private bool $isActive;

    public function __construct(int $eventId, bool $isActive)
    {
        $this->eventId = $eventId;
        $this->isActive = $isActive;
    }

    public function getEventId(): int
    {
        return $this->eventId;
    }

    public function isActive(): bool
    {
        return $this->isActive;
    }
}