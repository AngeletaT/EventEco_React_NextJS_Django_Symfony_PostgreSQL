<?php

namespace App\TicketInfo\Application\UseCase\Query\GetTicketInfosByEventSlug;

class GetTicketInfosByEventSlugQuery
{
    private string $eventSlug;

    public function __construct(string $eventSlug)
    {
        $this->eventSlug = $eventSlug;
    }

    public function getEventSlug(): string
    {
        return $this->eventSlug;
    }
}