<?php

namespace App\Event\Application\UseCase\Command\ToggleEventActive;

use App\Event\Application\DTO\Response\ToggleEventActiveResponse;
use App\Event\Presentation\Assembler\Response\ToggleEventActiveResponseAssembler;

class ToggleEventActiveCommandHandler
{
    private ToggleEventActiveService $service;

    public function __construct(ToggleEventActiveService $service)
    {
        $this->service = $service;
    }

    /**
     * @param ToggleEventActiveCommand $command
     * @return ToggleEventActiveResponse
     */
    public function __invoke(ToggleEventActiveCommand $command): ToggleEventActiveResponse
    {
        $newState = $this->service->toggle($command->getEventId());
        return ToggleEventActiveResponseAssembler::assemble($command->getEventId(), $newState);
    }
}