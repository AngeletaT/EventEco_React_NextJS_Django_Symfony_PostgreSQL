<?php

namespace App\Complement\Application\UseCase\InPort;

use App\Complement\Application\DTO\Response\ToggleComplementResponse;

interface ToggleComplementInterface
{
    public function toggle(int $complementId): ToggleComplementResponse;
}