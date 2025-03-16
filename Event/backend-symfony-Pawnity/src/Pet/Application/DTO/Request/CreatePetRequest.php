<?php
// src/Pet/Application/DTO/Request/CreatePetRequest.php
namespace App\Pet\Application\DTO\Request;

use App\Pet\Application\UseCase\Command\CreatePet\CreatePetCommand;

class CreatePetRequest
{
    private string $name;
    private string $species;
    private string $gender;
    private \DateTime $birthDate;
    private int $idOrg;
    private ?string $breed;
    private ?string $description;
    private ?string $image;
    private string $status;

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

    /**
     * Transforma el DTO en un comando para la creación del pet.
     *
     * @return CreatePetCommand
     */
    public function toCommand(): CreatePetCommand
    {
        return new CreatePetCommand(
            $this->name,
            $this->species,
            $this->gender,
            $this->birthDate,
            $this->idOrg,
            $this->breed,
            $this->description,
            $this->image,
            $this->status
        );
    }
    
    // Opcionalmente se pueden agregar getters si se requiere acceder a los datos individualmente
}
