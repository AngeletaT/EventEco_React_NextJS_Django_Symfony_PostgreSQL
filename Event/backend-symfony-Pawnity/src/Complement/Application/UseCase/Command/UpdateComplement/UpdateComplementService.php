<?php

namespace App\Complement\Application\UseCase\Command\UpdateComplement;

use App\Complement\Application\DTO\Request\UpdateComplementRequest;
use App\Complement\Application\DTO\Response\UpdateComplementResponse;
use App\Complement\Application\UseCase\InPort\UpdateComplementInterface;
use App\Complement\Domain\OutPort\ComplementRepositoryInterface;
use App\Complement\Domain\Entity\Complement;

class UpdateComplementService implements UpdateComplementInterface
{
    private ComplementRepositoryInterface $repository;

    public function __construct(ComplementRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function update(int $complementId, UpdateComplementRequest $request): UpdateComplementResponse
    {
        $complement = $this->repository->find($complementId);
        if (!$complement) {
            throw new \Exception("Complement with id {$complementId} not found.");
        }

        // Actualizar los campos
        $complement->setName($request->getName());
        $complement->setDescription($request->getDescription());
        $complement->setPrice($request->getPrice());
        $complement->setImageUrl($request->getImageUrl());
        // Si el request contiene un eventSlug, lo actualizamos; de lo contrario, se mantiene el actual.
        if ($request->getEventSlug() !== null) {
            $complement->setEventSlug($request->getEventSlug());
        }

        // Actualizar el updatedAt
        $complement->setUpdatedAt(new \DateTime());

        $this->repository->save($complement);

        return new UpdateComplementResponse(
            $complement->getIdComplement(),
            $complement->getName(),
            $complement->getDescription(),
            $complement->getPrice(),
            $complement->getImageUrl(),
            $complement->getEventSlug(),
            $complement->isActive(),
            $complement->getCreatedAt(),
            $complement->getUpdatedAt()
        );
    }
}