<?php

namespace App\TicketInfo\Application\UseCase\Command\CreateTicketInfo;

use App\TicketInfo\Application\DTO\Request\CreateTicketInfoRequest;

class CreateTicketInfoCommand
{
    private string $eventSlug;
    private CreateTicketInfoRequest $ticketInfoRequest;

    public function __construct(string $eventSlug, CreateTicketInfoRequest $ticketInfoRequest)
    {
        $this->eventSlug = $eventSlug;
        $this->ticketInfoRequest = $ticketInfoRequest;
    }

    public function getEventSlug(): string
    {
        return $this->eventSlug;
    }

    public function getTicketInfoRequest(): CreateTicketInfoRequest
    {
        return $this->ticketInfoRequest;
    }
}