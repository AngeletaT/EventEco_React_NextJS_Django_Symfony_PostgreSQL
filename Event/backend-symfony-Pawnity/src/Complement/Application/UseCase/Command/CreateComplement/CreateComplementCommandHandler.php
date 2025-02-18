<?php

namespace App\Complement\Application\UseCase\Command\CreateComplement;

use App\Complement\Application\DTO\Response\CreateComplementResponse;
use App\Complement\Application\UseCase\InPort\CreateComplementInterface;

class CreateComplementCommandHandler
{
    private CreateComplementInterface $service;

    public function __construct(CreateComplementInterface $service)
    {
        $this->service = $service;
    }

    public function __invoke(CreateComplementCommand $command): CreateComplementResponse
    {
        return $this->service->createComplement($command->getEventSlug(), $command->getComplementRequest());
    }
}