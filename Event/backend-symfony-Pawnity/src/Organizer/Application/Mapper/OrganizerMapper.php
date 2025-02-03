<?php

namespace App\Organizer\Application\Mapper;

use App\Organizer\Application\UseCase\Command\Register\RegisterOrganizerCommand;
use App\Organizer\Domain\Entity\Organizer;
use Symfony\Component\Uid\Uuid;

class OrganizerMapper
{
    public function toDomain(RegisterOrganizerCommand $command): Organizer
    {
        return new Organizer(
            Uuid::v4(),
            $command->getEmail(),
            password_hash($command->getPassword(), PASSWORD_BCRYPT),
            $command->getNif()
        );
    }
}