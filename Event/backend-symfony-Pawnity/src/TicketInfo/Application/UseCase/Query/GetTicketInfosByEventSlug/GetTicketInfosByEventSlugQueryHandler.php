<?php

namespace App\TicketInfo\Application\UseCase\Query\GetTicketInfosByEventSlug;

use App\TicketInfo\Application\DTO\Response\GetTicketInfoResponse;

class GetTicketInfosByEventSlugQueryHandler
{
    private GetTicketInfosByEventSlugQueryService $service;

    public function __construct(GetTicketInfosByEventSlugQueryService $service)
    {
        $this->service = $service;
    }

    /**
     * @param GetTicketInfosByEventSlugQuery $query
     * @return GetTicketInfoResponse[]
     */
    public function __invoke(GetTicketInfosByEventSlugQuery $query): array
    {
         return $this->service->getTicketInfos($query->getEventSlug());
    }
}