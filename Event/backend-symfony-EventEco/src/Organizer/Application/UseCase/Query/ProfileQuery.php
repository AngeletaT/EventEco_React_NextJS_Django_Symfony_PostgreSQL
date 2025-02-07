<?php

declare(strict_types=1);

namespace App\Organizer\Application\UseCase\Query;

class ProfileQuery
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