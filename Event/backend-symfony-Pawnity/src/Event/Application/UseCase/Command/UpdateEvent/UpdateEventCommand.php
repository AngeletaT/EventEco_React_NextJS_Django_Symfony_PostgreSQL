<?php

declare(strict_types=1);

namespace App\Event\Application\UseCase\Command\UpdateEvent;

use App\Event\Application\DTO\Request\UpdateEventRequest;

class UpdateEventCommand
{
    private int $eventId;
    private UpdateEventRequest $updateEventRequest;

    public function __construct(int $eventId, UpdateEventRequest $updateEventRequest)
    {
        $this->eventId = $eventId;
        $this->updateEventRequest = $updateEventRequest;
    }

    public function getEventId(): int
    {
        return $this->eventId;
    }

    public function getUpdateEventRequest(): UpdateEventRequest
    {
        return $this->updateEventRequest;
    }
}