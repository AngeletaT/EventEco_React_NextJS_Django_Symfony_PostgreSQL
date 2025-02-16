<?php

namespace App\TicketInfo\Application\UseCase\Query\GetTicketInfosByEventSlug;

use App\TicketInfo\Application\DTO\Response\GetTicketInfoResponse;
use App\TicketInfo\Application\UseCase\InPort\GetTicketInfosByEventSlugInterface;

class GetTicketInfosByEventSlugQueryHandler
{
    private GetTicketInfosByEventSlugInterface $service;

    public function __construct(GetTicketInfosByEventSlugInterface $service)
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