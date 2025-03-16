<?php
// src/Pet/Application/UseCase/Command/CreatePet/CreatePetCommand.php
namespace App\Pet\Application\UseCase\Command\CreatePet;

class CreatePetCommand
{
    private string $name;
    private string $species;
    private ?string $breed;
    private string $gender;
    private \DateTime $birthDate;
    private ?string $description;
    private ?string $image;
    private string $status;
    private int $idOrg;

    public function __construct(
        string $name,
        string $species,
        string $gender,
        \DateTime $birthDate,
        int $idOrg,
        ?string $breed = null,
        ?string $description = null,
        ?string $image = null,
        string $status = 'available'
    ) {
        $this->name = $name;
        $this->species = $species;
        $this->gender = $gender;
        $this->birthDate = $birthDate;
        $this->idOrg = $idOrg;
        $this->breed = $breed;
        $this->description = $description;
        $this->image = $image;
        $this->status = $status;
    }

    // Getters
    public function getName(): string { return $this->name; }
    public function getSpecies(): string { return $this->species; }
    public function getBreed(): ?string { return $this->breed; }
    public function getGender(): string { return $this->gender; }
    public function getBirthDate(): \DateTime { return $this->birthDate; }
    public function getDescription(): ?string { return $this->description; }
    public function getImage(): ?string { return $this->image; }
    public function getStatus(): string { return $this->status; }
    public function getIdOrg(): int { return $this->idOrg; }
}