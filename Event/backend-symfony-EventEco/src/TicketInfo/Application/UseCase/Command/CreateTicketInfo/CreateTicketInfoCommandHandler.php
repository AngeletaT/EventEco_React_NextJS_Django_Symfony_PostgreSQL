<?php

namespace App\TicketInfo\Application\UseCase\Command\CreateTicketInfo;

use App\TicketInfo\Application\DTO\Response\CreateTicketInfoResponse;

class CreateTicketInfoCommandHandler
{
    private CreateTicketInfoService $service;

    public function __construct(CreateTicketInfoService $service)
    {
        $this->service = $service;
    }

    public function __invoke(CreateTicketInfoCommand $command): CreateTicketInfoResponse
    {
        return $this->service->create($command->getEventSlug(), $command->getTicketInfoRequest());
    }
}