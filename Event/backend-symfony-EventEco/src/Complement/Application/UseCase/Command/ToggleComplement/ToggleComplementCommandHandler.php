<?php

namespace App\Complement\Application\UseCase\Command\ToggleComplement;

use App\Complement\Application\DTO\Response\ToggleComplementResponse;
use App\Complement\Application\UseCase\InPort\ToggleComplementInterface;

class ToggleComplementCommandHandler
{
    private ToggleComplementInterface $service;

    public function __construct(ToggleComplementInterface $service)
    {
        $this->service = $service;
    }

    public function __invoke(ToggleComplementCommand $command): ToggleComplementResponse
    {
        return $this->service->toggle($command->getComplementId());
    }
}