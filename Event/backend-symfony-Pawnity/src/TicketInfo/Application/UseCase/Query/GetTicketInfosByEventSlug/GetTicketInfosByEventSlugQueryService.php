<?php

namespace App\TicketInfo\Application\UseCase\Query\GetTicketInfosByEventSlug;

use App\TicketInfo\Application\DTO\Response\GetTicketInfoResponse;
use App\TicketInfo\Application\UseCase\InPort\GetTicketInfosByEventSlugInterface;
use App\TicketInfo\Domain\OutPort\TicketInfoRepositoryInterface;

class GetTicketInfosByEventSlugQueryService implements GetTicketInfosByEventSlugInterface
{
    private TicketInfoRepositoryInterface $repository;

    public function __construct(TicketInfoRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param string $eventSlug
     * @return GetTicketInfoResponse[]
     */
    public function getTicketInfos(string $eventSlug): array
    {
        $ticketInfos = $this->repository->findByEventSlug($eventSlug);
        $responses = [];

        foreach ($ticketInfos as $ticketInfo) {
            $responses[] = new GetTicketInfoResponse(
                $ticketInfo->getIdTicketInfo(),
                $ticketInfo->getEventSlug(),
                $ticketInfo->getType(),
                $ticketInfo->getPrice(),
                $ticketInfo->getCapacity(),
                $ticketInfo->getRemaining(),
                $ticketInfo->getDescripcion(),
                $ticketInfo->getIsActive(),
                $ticketInfo->getCreatedAt(),
                $ticketInfo->getUpdatedAt()
            );
        }

        return $responses;
    }
}