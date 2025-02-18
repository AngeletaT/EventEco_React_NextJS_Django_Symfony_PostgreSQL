<?php

namespace App\Event\Application\UseCase\InPort;

use App\Event\Application\DTO\Request\UpdateSubEventRequest;
use App\Event\Application\DTO\Response\UpdateSubEventResponse;

interface UpdateSubEventInterface
{
    public function updateSubEvent(int $subEventId, UpdateSubEventRequest $request): UpdateSubEventResponse;
}