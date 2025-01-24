<?php

namespace App\Organizer\Application\Mapper;

use App\Organizer\Application\UseCase\Command\CreateOrganizerCommand;
use App\Organizer\Domain\Entity\Organizer;
use Symfony\Component\Uid\Uuid;

class OrganizerMapper
{
    public function toDomain(CreateOrganizerCommand $command): Organizer
    {
        return new Organizer(
            Uuid::v4(),
            $command->getEmail(),
            password_hash($command->getPassword(), PASSWORD_BCRYPT),
            $command->getNif()
        );
    }
}