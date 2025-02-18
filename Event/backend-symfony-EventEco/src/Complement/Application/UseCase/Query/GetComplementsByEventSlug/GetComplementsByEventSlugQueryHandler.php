<?php

namespace App\Complement\Application\UseCase\Query\GetComplementsByEventSlug;

use App\Complement\Application\DTO\Response\GetComplementResponse;

class GetComplementsByEventSlugQueryHandler
{
    private GetComplementsByEventSlugQueryService $service;

    public function __construct(GetComplementsByEventSlugQueryService $service)
    {
        $this->service = $service;
    }

    /**
     * @param GetComplementsByEventSlugQuery $query
     * @return GetComplementResponse[]
     */
    public function __invoke(GetComplementsByEventSlugQuery $query): array
    {
        return $this->service->getComplements($query->getEventSlug());
    }
}