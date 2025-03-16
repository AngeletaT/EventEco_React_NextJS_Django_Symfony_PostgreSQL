<?php
// src/Pet/Application/UseCase/Command/CreatePet/CreatePetCommandHandler.php
namespace App\Pet\Application\UseCase\Command\CreatePet;

use App\Pet\Application\DTO\Request\CreatePetRequest;
use App\Pet\Application\Mapper\PetMapper;
use App\Pet\Domain\Entity\Pet;

class CreatePetCommandHandler
{
    private CreatePetService $service;
    private PetMapper $mapper;

    public function __construct(CreatePetService $service, PetMapper $mapper)
    {
        $this->service = $service;
        $this->mapper = $mapper;
    }

    public function handle(CreatePetCommand $command): Pet
    {
        // Convierte el comando en la entidad Pet
        $pet = $this->mapper->commandToEntity($command);
        // Se delega la creación al servicio que ejecuta la lógica de negocio y persistencia
        return $this->service->create($pet);
    }
}