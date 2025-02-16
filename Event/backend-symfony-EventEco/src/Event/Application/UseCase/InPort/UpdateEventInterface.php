<?php

declare(strict_types=1);

namespace App\Event\Application\UseCase\InPort;

use App\Event\Application\DTO\Request\UpdateEventRequest;
use App\Event\Application\DTO\Response\UpdateEventResponse;

interface UpdateEventInterface
{
    /**
     * Actualiza un evento dado su identificador y los nuevos datos.
     *
     * @param UpdateEventRequest $request Los datos opcionales de actualización.
     * @param int $eventId El identificador del evento a actualizar.
     *
     * @return UpdateEventResponse La respuesta con los datos actualizados del evento.
     */
    public function updateEvent(UpdateEventRequest $request, int $eventId): UpdateEventResponse;
}