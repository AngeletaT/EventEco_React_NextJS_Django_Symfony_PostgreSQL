<?php

namespace App\Event\Application\UseCase\Command\ToggleSubEvent;

use App\Event\Application\DTO\Response\ToggleSubEventResponse;
use App\Event\Application\UseCase\InPort\ToggleSubEventInterface;

class ToggleSubEventCommandHandler
{
    private ToggleSubEventInterface $service;

    public function __construct(ToggleSubEventInterface $service)
    {
        $this->service = $service;
    }

    public function __invoke(ToggleSubEventCommand $command): ToggleSubEventResponse
    {
        return $this->service->toggle($command->getSubEventId());
    }
}