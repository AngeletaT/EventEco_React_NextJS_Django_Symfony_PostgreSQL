<?php

namespace App\Complement\Application\UseCase\Command\CreateComplement;

use App\Complement\Application\DTO\Request\CreateComplementRequest;
use App\Complement\Application\DTO\Response\CreateComplementResponse;
use App\Complement\Application\UseCase\InPort\CreateComplementInterface;
use App\Complement\Domain\Entity\Complement;
use App\Complement\Domain\OutPort\ComplementRepositoryInterface;

class CreateComplementService implements CreateComplementInterface
{
    private ComplementRepositoryInterface $repository;

    public function __construct(ComplementRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function createComplement(string $eventSlug, CreateComplementRequest $request): CreateComplementResponse
    {
        $complement = new Complement(
            $request->getName(),
            $request->getDescription(),
            $request->getPrice(),
            $request->getImageUrl(),
            $eventSlug
        );

        $this->repository->save($complement);

        return new CreateComplementResponse(
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