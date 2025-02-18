<?php

namespace App\Event\Application\UseCase\InPort;

use App\Event\Application\DTO\Response\ToggleSubEventResponse;

interface ToggleSubEventInterface
{
    public function toggle(int $subEventId): ToggleSubEventResponse;
}