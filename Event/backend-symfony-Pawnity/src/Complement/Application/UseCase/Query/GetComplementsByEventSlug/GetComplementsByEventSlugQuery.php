<?php

namespace App\Complement\Application\UseCase\Query\GetComplementsByEventSlug;

class GetComplementsByEventSlugQuery
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