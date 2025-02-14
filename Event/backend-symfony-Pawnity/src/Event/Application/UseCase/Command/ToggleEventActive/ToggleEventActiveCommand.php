<?php

namespace App\Event\Application\UseCase\Command\ToggleEventActive;

class ToggleEventActiveCommand
{
    private int $eventId;

    public function __construct(int $eventId)
    {
        $this->eventId = $eventId;
    }

    public function getEventId(): int
    {
        return $this->eventId;
    }
}