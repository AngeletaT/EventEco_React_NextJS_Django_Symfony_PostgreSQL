<?php

namespace App\Event\Application\UseCase\InPort;

use App\Event\Application\DTO\Request\CreateSubEventRequest;
use App\Event\Application\DTO\Response\CreateSubEventResponse;

interface CreateSubEventInterface
{
    /**
     * Crea un subevento para el Event identificado por $eventId.
     */
    public function createSubEvent(int $eventId, CreateSubEventRequest $request): CreateSubEventResponse;
}