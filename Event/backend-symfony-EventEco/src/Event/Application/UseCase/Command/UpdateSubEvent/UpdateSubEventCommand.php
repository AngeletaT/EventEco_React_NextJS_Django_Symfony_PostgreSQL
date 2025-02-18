<?php

namespace App\Event\Application\UseCase\Command\UpdateSubEvent;

use App\Event\Application\DTO\Request\UpdateSubEventRequest;

class UpdateSubEventCommand
{
    private int $subEventId;
    private UpdateSubEventRequest $updateRequest;

    public function __construct(int $subEventId, UpdateSubEventRequest $updateRequest)
    {
        $this->subEventId = $subEventId;
        $this->updateRequest = $updateRequest;
    }

    public function getSubEventId(): int {
        return $this->subEventId;
    }
    public function getUpdateRequest(): UpdateSubEventRequest {
        return $this->updateRequest;
    }
}