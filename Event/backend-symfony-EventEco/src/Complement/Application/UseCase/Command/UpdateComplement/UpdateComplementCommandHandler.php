<?php

namespace App\Complement\Application\UseCase\Command\UpdateComplement;

use App\Complement\Application\DTO\Response\UpdateComplementResponse;
use App\Complement\Application\UseCase\InPort\UpdateComplementInterface;

class UpdateComplementCommandHandler
{
    private UpdateComplementInterface $service;

    public function __construct(UpdateComplementInterface $service)
    {
        $this->service = $service;
    }

    public function __invoke(UpdateComplementCommand $command): UpdateComplementResponse
    {
        return $this->service->update($command->getComplementId(), $command->getUpdateRequest());
    }
}