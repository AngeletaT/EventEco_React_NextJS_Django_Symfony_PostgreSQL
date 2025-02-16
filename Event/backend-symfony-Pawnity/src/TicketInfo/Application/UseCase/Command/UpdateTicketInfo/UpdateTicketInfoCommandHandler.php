<?php

namespace App\TicketInfo\Application\UseCase\Command\UpdateTicketInfo;

use App\TicketInfo\Application\DTO\Response\UpdateTicketInfoResponse;
use App\TicketInfo\Application\UseCase\InPort\UpdateTicketInfoInterface;

class UpdateTicketInfoCommandHandler
{
    private UpdateTicketInfoInterface $service;

    public function __construct(UpdateTicketInfoInterface $service)
    {
        $this->service = $service;
    }

    public function __invoke(UpdateTicketInfoCommand $command): UpdateTicketInfoResponse
    {
        return $this->service->update($command->getTicketInfoId(), $command->getUpdateRequest());
    }
}