<?php
// src/Pet/Application/Mapper/PetMapper.php
namespace App\Pet\Application\Mapper;

use App\Pet\Application\UseCase\Command\CreatePet\CreatePetCommand;
use App\Pet\Domain\Entity\Pet;

class PetMapper
{
    public function commandToEntity(CreatePetCommand $command): Pet
    {
        return new Pet(
            $command->getName(),
            $command->getSpecies(),
            $command->getGender(),
            $command->getBirthDate(),
            $command->getIdOrg(),
            $command->getBreed(),
            $command->getDescription(),
            $command->getImage(),
            $command->getStatus()
        );
    }
}
