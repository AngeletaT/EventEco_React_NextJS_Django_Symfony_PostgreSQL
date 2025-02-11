<?php

declare(strict_types=1);

namespace App\Event\Application\UseCase\Command\UpdateEvent;

use App\Event\Application\DTO\Response\UpdateEventResponse;

class UpdateEventCommandHandler
{
    private UpdateEventService $service;

    public function __construct(UpdateEventService $service)
    {
        $this->service = $service;
    }

    /**
     * Método invocable que procesa el comando y retorna la respuesta.
     *
     * @param UpdateEventCommand $command
     * @return UpdateEventResponse
     */
    public function __invoke(UpdateEventCommand $command): UpdateEventResponse
    {
        return $this->service->updateEvent(
            $command->getUpdateEventRequest(),
            $command->getEventId()
        );
    }
}