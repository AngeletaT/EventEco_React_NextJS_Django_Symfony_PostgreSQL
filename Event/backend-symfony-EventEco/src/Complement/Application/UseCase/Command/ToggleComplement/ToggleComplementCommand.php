<?php

namespace App\Complement\Application\UseCase\Command\ToggleComplement;

class ToggleComplementCommand
{
    private int $complementId;

    public function __construct(int $complementId)
    {
        $this->complementId = $complementId;
    }

    public function getComplementId(): int
    {
        return $this->complementId;
    }
}