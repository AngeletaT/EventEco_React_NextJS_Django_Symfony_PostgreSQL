<?php

namespace App\Event\Application\UseCase\Command\ToggleSubEvent;

class ToggleSubEventCommand
{
    private int $subEventId;

    public function __construct(int $subEventId)
    {
        $this->subEventId = $subEventId;
    }

    public function getSubEventId(): int
    {
        return $this->subEventId;
    }
}