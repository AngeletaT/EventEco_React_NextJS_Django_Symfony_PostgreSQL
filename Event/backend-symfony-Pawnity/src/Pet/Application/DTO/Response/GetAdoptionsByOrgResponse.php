<?php
namespace App\Pet\Application\DTO\Response;

use App\Pet\Domain\Entity\Adoption;

class GetAdoptionsByOrgResponse
{
    private array $adoptions;

    public function __construct(array $adoptions)
    {
        $this->adoptions = array_map(fn(Adoption $adoption) => [
            'id' => $adoption->getId(),
            'client' => [
                'firstName' => $adoption->getClient()->getFirstName(),
                'lastName' => $adoption->getClient()->getLastName(),
                'phoneNumber' => $adoption->getClient()->getPhoneNumber(),
                'dni' => $adoption->getClient()->getDni(),
                'avatarUrl' => $adoption->getClient()->getAvatarUrl(),
            ],
            'pet' => [
                'uuid' => $adoption->getPet()->getUuid(),
                'name' => $adoption->getPet()->getName(),
                'species' => $adoption->getPet()->getSpecies(),
                'breed' => $adoption->getPet()->getBreed(),
                'gender' => $adoption->getPet()->getGender(),
                'birthDate' => $adoption->getPet()->getBirthDate()->format('Y-m-d'),
                'image' => $adoption->getPet()->getImage(),
                'status' => $adoption->getPet()->getStatus(),
            ],
            'adoptionDate' => $adoption->getAdoptionDate()->format('Y-m-d'),
            'lastReviewDate' => $adoption->getLastReviewDate() ? $adoption->getLastReviewDate()->format('Y-m-d') : null,
            'isActive' => $adoption->isActive(),
        ], $adoptions);
    }

    public function getAdoptions(): array
    {
        return $this->adoptions;
    }
}
