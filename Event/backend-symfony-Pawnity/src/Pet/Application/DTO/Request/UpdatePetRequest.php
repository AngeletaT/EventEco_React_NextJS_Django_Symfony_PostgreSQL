<?php
// src/Pet/Application/DTO/Request/UpdatePetRequest.php
namespace App\Pet\Application\DTO\Request;

use App\Pet\Application\UseCase\Command\UpdatePet\UpdatePetCommand;

class UpdatePetRequest
{
    private string $uuid;
    private ?string $name;
    private ?string $species;
    private ?string $breed;
    private ?string $gender;
    private ?\DateTime $birthDate;
    private ?string $description;
    private ?string $image;
    private ?string $status;
    private ?int $idOrg;
    private ?bool $isActive;

    public function __construct(
        string $uuid,
        ?string $name = null,
        ?string $species = null,
        ?string $breed = null,
        ?string $gender = null,
        ?\DateTime $birthDate = null,
        ?string $description = null,
        ?string $image = null,
        ?string $status = null,
        ?int $idOrg = null,
        ?bool $isActive = null
    ) {
        $this->uuid = $uuid;
        $this->name = $name;
        $this->species = $species;
        $this->breed = $breed;
        $this->gender = $gender;
        $this->birthDate = $birthDate;
        $this->description = $description;
        $this->image = $image;
        $this->status = $status;
        $this->idOrg = $idOrg;
        $this->isActive = $isActive;
    }

    public function toCommand(): UpdatePetCommand
    {
        return new UpdatePetCommand(
            $this->uuid,
            $this->name,
            $this->species,
            $this->breed,
            $this->gender,
            $this->birthDate,
            $this->description,
            $this->image,
            $this->status,
            $this->idOrg,
            $this->isActive
        );
    }
}
