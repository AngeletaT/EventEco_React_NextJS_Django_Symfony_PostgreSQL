<?php
// src/Pet/Application/UseCase/Command/UpdatePet/UpdatePetCommandHandler.php
namespace App\Pet\Application\UseCase\Command\UpdatePet;

use App\Pet\Domain\OutPort\PetRepositoryInterface;
use App\Pet\Application\DTO\Response\UpdatePetResponse;

class UpdatePetCommandHandler
{
    private PetRepositoryInterface $repository;

    public function __construct(PetRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function handle(UpdatePetCommand $command): UpdatePetResponse
    {
        $pet = $this->repository->findByUuid($command->getUuid());

        if (!$pet) {
            throw new \Exception("Pet not found.");
        }

        if ($command->getName() !== null) { $pet->setName($command->getName()); }
        if ($command->getSpecies() !== null) { $pet->setSpecies($command->getSpecies()); }
        if ($command->getBreed() !== null) { $pet->setBreed($command->getBreed()); }
        if ($command->getGender() !== null) { $pet->setGender($command->getGender()); }
        if ($command->getBirthDate() !== null) { $pet->setBirthDate($command->getBirthDate()); }
        if ($command->getDescription() !== null) { $pet->setDescription($command->getDescription()); }
        if ($command->getImage() !== null) { $pet->setImage($command->getImage()); }
        if ($command->getStatus() !== null) { $pet->setStatus($command->getStatus()); }
        if ($command->getIdOrg() !== null) { $pet->setIdOrg($command->getIdOrg()); }
        if ($command->getIsActive() !== null) { $pet->setActive($command->getIsActive()); }

        $this->repository->save($pet);

        return new UpdatePetResponse($pet->getUuid(), "Pet updated successfully.");
    }
}
