<?php

namespace App\Organizer\Application\UseCase\InPort;

use App\Organizer\Application\UseCase\Command\Login\LoginOrganizerCommand;
use App\Organizer\Application\DTO\Response\LoginOrganizerResponse;

interface LoginOrganizerInterface
{
    public function login(LoginOrganizerCommand $command): LoginOrganizerResponse;
}