<?php

namespace App\Organizer\Application\UseCase\Command\Logout;

class LogoutOrganizerCommand
{
    private int $organizerId;

    public function __construct(int $organizerId)
    {
        $this->organizerId = $organizerId;
    }

    public function getOrganizerId(): int
    {
        return $this->organizerId;
    }
}