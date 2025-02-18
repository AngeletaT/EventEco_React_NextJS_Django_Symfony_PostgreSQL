<?php

namespace App\TicketInfo\Application\DTO\Response;

class ToggleTicketInfoResponse
{
    private int $ticketInfoId;
    private bool $isActive;

    public function __construct(int $ticketInfoId, bool $isActive)
    {
        $this->ticketInfoId = $ticketInfoId;
        $this->isActive = $isActive;
    }

    public function getTicketInfoId(): int
    {
        return $this->ticketInfoId;
    }

    public function isActive(): bool
    {
        return $this->isActive;
    }
}