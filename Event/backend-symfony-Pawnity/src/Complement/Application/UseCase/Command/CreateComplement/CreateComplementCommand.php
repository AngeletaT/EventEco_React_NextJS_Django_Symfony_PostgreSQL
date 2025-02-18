<?php

namespace App\Complement\Application\UseCase\Command\CreateComplement;

use App\Complement\Application\DTO\Request\CreateComplementRequest;

class CreateComplementCommand
{
    private string $eventSlug;
    private CreateComplementRequest $complementRequest;

    public function __construct(string $eventSlug, CreateComplementRequest $complementRequest)
    {
        $this->eventSlug = $eventSlug;
        $this->complementRequest = $complementRequest;
    }

    public function getEventSlug(): string {
        return $this->eventSlug;
    }
    public function getComplementRequest(): CreateComplementRequest {
        return $this->complementRequest;
    }
}