<?php

namespace App\Event\Application\UseCase\Command\UpdateSubEvent;

use App\Event\Application\DTO\Response\UpdateSubEventResponse;
use App\Event\Application\UseCase\InPort\UpdateSubEventInterface;

class UpdateSubEventCommandHandler
{
    private UpdateSubEventInterface $service;

    public function __construct(UpdateSubEventInterface $service)
    {
        $this->service = $service;
    }

    public function __invoke(UpdateSubEventCommand $command): UpdateSubEventResponse
    {
        return $this->service->updateSubEvent($command->getSubEventId(), $command->getUpdateRequest());
    }
}