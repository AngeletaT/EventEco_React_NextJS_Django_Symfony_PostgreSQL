<?php

namespace App\TicketInfo\Application\UseCase\Command\ToggleTicketInfo;

use App\TicketInfo\Application\DTO\Response\ToggleTicketInfoResponse;
use App\TicketInfo\Application\UseCase\InPort\ToggleTicketInfoInterface;

class ToggleTicketInfoCommandHandler
{
    private ToggleTicketInfoInterface $service;

    public function __construct(ToggleTicketInfoInterface $service)
    {
        $this->service = $service;
    }

    public function __invoke(ToggleTicketInfoCommand $command): ToggleTicketInfoResponse
    {
        return $this->service->toggle($command->getTicketInfoId());
    }
}