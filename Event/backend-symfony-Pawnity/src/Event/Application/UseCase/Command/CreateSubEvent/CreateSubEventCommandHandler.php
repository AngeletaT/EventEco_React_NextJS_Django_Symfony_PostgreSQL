<?php

namespace App\Event\Application\UseCase\Command\CreateSubEvent;

use App\Event\Application\DTO\Response\CreateSubEventResponse;
use App\Event\Application\UseCase\InPort\CreateSubEventInterface;

class CreateSubEventCommandHandler
{
    private CreateSubEventInterface $service;

    public function __construct(CreateSubEventInterface $service)
    {
        $this->service = $service;
    }

    public function __invoke(CreateSubEventCommand $command): CreateSubEventResponse
    {
        return $this->service->createSubEvent(
            $command->getEventId(),
            $command->getSubEventRequest()
        );
    }
}