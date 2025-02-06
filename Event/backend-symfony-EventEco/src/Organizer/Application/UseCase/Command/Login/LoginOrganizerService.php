<?php

namespace App\Organizer\Application\UseCase\Command\Login;

use App\Organizer\Application\DTO\Response\LoginOrganizerResponse;
use App\Organizer\Application\UseCase\InPort\LoginOrganizerInterface;

class LoginOrganizerService implements LoginOrganizerInterface
{
    private LoginOrganizerHandler $handler;

    public function __construct(LoginOrganizerHandler $handler)
    {
        $this->handler = $handler;
    }

    public function login(LoginOrganizerCommand $command): LoginOrganizerResponse
    {
        return ($this->handler)($command);
    }
}