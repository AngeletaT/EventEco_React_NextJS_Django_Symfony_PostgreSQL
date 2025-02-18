<?php

namespace App\Complement\Application\UseCase\InPort;

use App\Complement\Application\DTO\Request\CreateComplementRequest;
use App\Complement\Application\DTO\Response\CreateComplementResponse;

interface CreateComplementInterface
{
    public function createComplement(string $eventSlug, CreateComplementRequest $request): CreateComplementResponse;
}