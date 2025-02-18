<?php

namespace App\Event\Application\UseCase\Command\CreateSubEvent;

use App\Event\Application\DTO\Request\CreateSubEventRequest;

class CreateSubEventCommand
{
    private int $eventId;
    private CreateSubEventRequest $subEventRequest;

    public function __construct(int $eventId, CreateSubEventRequest $subEventRequest)
    {
        $this->eventId = $eventId;
        $this->subEventRequest = $subEventRequest;
    }

    public function getEventId(): int {
        return $this->eventId;
    }
    public function getSubEventRequest(): CreateSubEventRequest {
        return $this->subEventRequest;
    }
}