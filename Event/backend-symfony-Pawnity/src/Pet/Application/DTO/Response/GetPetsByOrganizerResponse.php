<?php
namespace App\Pet\Application\DTO\Response;

use App\Pet\Domain\Entity\Pet;

class GetPetsByOrganizerResponse
{
    private array $pets;

    public function __construct(array $pets)
    {
        $this->pets = array_map(fn(Pet $pet) => [
            'uuid' => $pet->getUuid(),
            'name' => $pet->getName(),
            'species' => $pet->getSpecies(),
            'breed' => $pet->getBreed(),
            'gender' => $pet->getGender(),
            'birthDate' => $pet->getBirthDate()->format('Y-m-d'),
            'description' => $pet->getDescription(),
            'image' => $pet->getImage(),
            'status' => $pet->getStatus(),
            'idOrg' => $pet->getIdOrg(),
            'isActive' => $pet->isActive(),
        ], $pets);
    }

    public function getPets(): array
    {
        return $this->pets;
    }
}
