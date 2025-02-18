<?php

namespace App\TicketInfo\Application\UseCase\InPort;

use App\TicketInfo\Application\DTO\Response\ToggleTicketInfoResponse;

interface ToggleTicketInfoInterface
{
    public function toggle(int $ticketInfoId): ToggleTicketInfoResponse;
}