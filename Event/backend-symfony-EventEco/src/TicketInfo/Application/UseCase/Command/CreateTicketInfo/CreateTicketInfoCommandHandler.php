<?php

namespace App\TicketInfo\Application\UseCase\Command\CreateTicketInfo;

use App\TicketInfo\Application\DTO\Response\CreateTicketInfoResponse;
use App\TicketInfo\Application\UseCase\InPort\CreateTicketInfoInterface;

class CreateTicketInfoCommandHandler
{
    private CreateTicketInfoInterface $service;

    public function __construct(CreateTicketInfoInterface $service)
    {
        $this->service = $service;
    }

    public function __invoke(CreateTicketInfoCommand $command): CreateTicketInfoResponse
    {
        return $this->service->create($command->getEventSlug(), $command->getTicketInfoRequest());
    }
}