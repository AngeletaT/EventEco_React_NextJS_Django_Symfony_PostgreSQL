<?php

declare(strict_types=1);

namespace App\Event\Application\UseCase\Command\CreateEvent;

use App\Event\Application\DTO\Request\CreateEventRequest;

class CreateEventCommand
{
    private CreateEventRequest $createEventRequest;

    public function __construct(CreateEventRequest $createEventRequest)
    {
        $this->createEventRequest = $createEventRequest;
    }

    public function getCreateEventRequest(): CreateEventRequest
    {
        return $this->createEventRequest;
    }
}