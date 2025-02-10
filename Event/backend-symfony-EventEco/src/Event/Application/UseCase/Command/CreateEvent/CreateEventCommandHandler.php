<?php

declare(strict_types=1);

namespace App\Event\Application\UseCase\Command\CreateEvent;

use App\Event\Application\DTO\Response\CreateEventResponse;

class CreateEventCommandHandler
{
    private CreateEventService $service;

    public function __construct(CreateEventService $service)
    {
        $this->service = $service;
    }

    /**
     * Procesa el comando para crear un evento, asignando el orgId.
     *
     * @param CreateEventCommand $command
     * @param int $orgId
     * @return CreateEventResponse
     */
    public function __invoke(CreateEventCommand $command, int $orgId): CreateEventResponse
    {
        return $this->service->createEvent($command->getCreateEventRequest(), $orgId);
    }
}