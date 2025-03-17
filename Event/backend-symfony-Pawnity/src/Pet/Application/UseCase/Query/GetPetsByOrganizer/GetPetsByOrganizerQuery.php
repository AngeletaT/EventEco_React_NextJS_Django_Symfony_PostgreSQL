<?php
// src/Pet/Application/UseCase/Query/GetPetsByOrganizer/GetPetsByOrganizerQuery.php

namespace App\Pet\Application\UseCase\Query\GetPetsByOrganizer;

class GetPetsByOrganizerQuery
{
    private int $idOrg;

    public function __construct(int $idOrg)
    {
        $this->idOrg = $idOrg;
    }

    public function getIdOrg(): int
    {
        return $this->idOrg;
    }
}
