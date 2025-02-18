<?php

namespace App\Complement\Application\DTO\Response;

class ToggleComplementResponse
{
    private int $idComplement;
    private bool $isActive;

    public function __construct(int $idComplement, bool $isActive)
    {
        $this->idComplement = $idComplement;
        $this->isActive = $isActive;
    }

    public function getIdComplement(): int
    {
        return $this->idComplement;
    }

    public function isActive(): bool
    {
        return $this->isActive;
    }
}