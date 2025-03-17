<?php
// src/Pet/Application/UseCase/Command/UpdatePet/UpdatePetCommand.php
namespace App\Pet\Application\UseCase\Command\UpdatePet;

class UpdatePetCommand
{
    public function __construct(
        private string $uuid,
        private ?string $name,
        private ?string $species,
        private ?string $breed,
        private ?string $gender,
        private ?\DateTime $birthDate,
        private ?string $description,
        private ?string $image,
        private ?string $status,
        private ?int $idOrg,
        private ?bool $isActive
    ) {}

    public function getUuid(): string { return $this->uuid; }
    public function getName(): ?string { return $this->name; }
    public function getSpecies(): ?string { return $this->species; }
    public function getBreed(): ?string { return $this->breed; }
    public function getGender(): ?string { return $this->gender; }
    public function getBirthDate(): ?\DateTime { return $this->birthDate; }
    public function getDescription(): ?string { return $this->description; }
    public function getImage(): ?string { return $this->image; }
    public function getStatus(): ?string { return $this->status; }
    public function getIdOrg(): ?int { return $this->idOrg; }
    public function getIsActive(): ?bool { return $this->isActive; }
}
