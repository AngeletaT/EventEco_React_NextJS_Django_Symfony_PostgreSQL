<?php
// src/Pet/Application/UseCase/Query/GetPetsByOrganizer/GetPetsByOrganizerQueryHandler.php

namespace App\Pet\Application\UseCase\Query\GetPetsByOrganizer;

use App\Pet\Domain\OutPort\PetRepositoryInterface;
use App\Pet\Application\DTO\Response\GetPetsByOrganizerResponse;

class GetPetsByOrganizerQueryHandler
{
    private PetRepositoryInterface $repository;

    public function __construct(PetRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function handle(GetPetsByOrganizerQuery $query): GetPetsByOrganizerResponse
    {
        $pets = $this->repository->findByOrganizerId($query->getIdOrg());

        return new GetPetsByOrganizerResponse($pets);
    }
}
