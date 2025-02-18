<?php

namespace App\Complement\Application\UseCase\InPort;

use App\Complement\Application\DTO\Request\UpdateComplementRequest;
use App\Complement\Application\DTO\Response\UpdateComplementResponse;

interface UpdateComplementInterface
{
    public function update(int $complementId, UpdateComplementRequest $request): UpdateComplementResponse;
}