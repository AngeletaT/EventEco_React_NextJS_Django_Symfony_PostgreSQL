<?php

namespace App\Complement\Application\UseCase\Query\GetComplementsByEventSlug;

use App\Complement\Domain\OutPort\ComplementRepositoryInterface;
use App\Complement\Application\DTO\Response\GetComplementResponse;

class GetComplementsByEventSlugQueryService
{
    private ComplementRepositoryInterface $repository;

    public function __construct(ComplementRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param string $eventSlug
     * @return GetComplementResponse[]
     */
    public function getComplements(string $eventSlug): array
    {
        $complements = $this->repository->findByEventSlug($eventSlug);
        $responses = [];
        foreach ($complements as $complement) {
            $responses[] = new GetComplementResponse(
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
        return $responses;
    }
}