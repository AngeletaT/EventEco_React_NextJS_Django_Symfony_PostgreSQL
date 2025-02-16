<?php

namespace App\TicketInfo\Application\UseCase\InPort;

use App\TicketInfo\Application\DTO\Request\UpdateTicketInfoRequest;
use App\TicketInfo\Application\DTO\Response\UpdateTicketInfoResponse;

interface UpdateTicketInfoInterface
{
    public function update(int $ticketInfoId, UpdateTicketInfoRequest $request): UpdateTicketInfoResponse;
}