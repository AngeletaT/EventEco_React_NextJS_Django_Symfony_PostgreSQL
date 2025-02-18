<?php

namespace App\TicketInfo\Application\UseCase\Command\ToggleTicketInfo;

class ToggleTicketInfoCommand
{
    private int $ticketInfoId;

    public function __construct(int $ticketInfoId)
    {
        $this->ticketInfoId = $ticketInfoId;
    }

    public function getTicketInfoId(): int
    {
        return $this->ticketInfoId;
    }
}