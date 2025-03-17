<?php
namespace App\Pet\Application\DTO\Response;

use App\Pet\Domain\Entity\Sponsorship;

class GetSponsorshipsByOrgResponse
{
    private array $sponsorships;

    public function __construct(array $sponsorships)
    {
        $this->sponsorships = array_map(fn(Sponsorship $sponsorship) => [
            'id' => $sponsorship->getId(),
            'client' => [
                'firstName' => $sponsorship->getClient()->getFirstName(),
                'lastName' => $sponsorship->getClient()->getLastName(),
                'phoneNumber' => $sponsorship->getClient()->getPhoneNumber(),
                'dni' => $sponsorship->getClient()->getDni(),
                'avatarUrl' => $sponsorship->getClient()->getAvatarUrl(),
            ],
            'pet' => [
                'uuid' => $sponsorship->getPet()->getUuid(),
                'name' => $sponsorship->getPet()->getName(),
                'species' => $sponsorship->getPet()->getSpecies(),
                'breed' => $sponsorship->getPet()->getBreed(),
                'gender' => $sponsorship->getPet()->getGender(),
                'birthDate' => $sponsorship->getPet()->getBirthDate()->format('Y-m-d'),
                'image' => $sponsorship->getPet()->getImage(),
                'status' => $sponsorship->getPet()->getStatus(),
            ],
            'startDate' => $sponsorship->getStartDate()->format('Y-m-d'),
            'endDate' => $sponsorship->getEndDate() ? $sponsorship->getEndDate()->format('Y-m-d') : null,
            'isActive' => $sponsorship->isActive(),
        ], $sponsorships);
    }

    public function getSponsorships(): array
    {
        return $this->sponsorships;
    }
}
