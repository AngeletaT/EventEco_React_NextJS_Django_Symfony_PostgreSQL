<?php

namespace App\TicketInfo\Application\UseCase\Command\UpdateTicketInfo;

use App\TicketInfo\Application\DTO\Request\UpdateTicketInfoRequest;

class UpdateTicketInfoCommand
{
    private int $ticketInfoId;
    private UpdateTicketInfoRequest $updateRequest;

    public function __construct(int $ticketInfoId, UpdateTicketInfoRequest $updateRequest)
    {
        $this->ticketInfoId  = $ticketInfoId;
        $this->updateRequest = $updateRequest;
    }

    public function getTicketInfoId(): int
    {
        return $this->ticketInfoId;
    }

    public function getUpdateRequest(): UpdateTicketInfoRequest
    {
        return $this->updateRequest;
    }
}