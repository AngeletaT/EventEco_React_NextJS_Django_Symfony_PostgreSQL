<?php

declare(strict_types=1);

namespace App\Organizer\Application\DTO\Request;

class ProfileRequest
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