<?php

namespace App\Complement\Application\UseCase\Command\ToggleComplement;

use App\Complement\Application\UseCase\InPort\ToggleComplementInterface;
use App\Complement\Application\DTO\Response\ToggleComplementResponse;
use App\Complement\Domain\OutPort\ComplementRepositoryInterface;

class ToggleComplementService implements ToggleComplementInterface
{
    private ComplementRepositoryInterface $repository;

    public function __construct(ComplementRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function toggle(int $complementId): ToggleComplementResponse
    {
        $complement = $this->repository->find($complementId);
        if (!$complement) {
            throw new \Exception("Complement with id {$complementId} not found.");
        }

        // Invertir el valor actual de isActive
        $complement->setIsActive(!$complement->isActive());

        // Persistir el cambio
        $this->repository->save($complement);

        return new ToggleComplementResponse(
            $complement->getIdComplement(),
            $complement->isActive()
        );
    }
}