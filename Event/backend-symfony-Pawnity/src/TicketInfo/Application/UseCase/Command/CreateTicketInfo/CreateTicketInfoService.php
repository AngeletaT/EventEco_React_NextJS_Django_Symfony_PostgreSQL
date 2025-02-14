<?php

namespace App\TicketInfo\Application\UseCase\Command\CreateTicketInfo;

use App\TicketInfo\Application\DTO\Request\CreateTicketInfoRequest;
use App\TicketInfo\Application\DTO\Response\CreateTicketInfoResponse;
use App\TicketInfo\Domain\Entity\TicketInfo;
use App\TicketInfo\Domain\OutPort\TicketInfoRepositoryInterface;

class CreateTicketInfoService
{
    private TicketInfoRepositoryInterface $repository;

    public function __construct(TicketInfoRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function create(string $eventSlug, CreateTicketInfoRequest $request): CreateTicketInfoResponse
    {
        $ticketInfo = new TicketInfo();
        $ticketInfo->setEventSlug($eventSlug);
        $ticketInfo->setType($request->getType());
        $ticketInfo->setPrice($request->getPrice());
        $ticketInfo->setCapacity($request->getCapacity());
        $ticketInfo->setRemaining($request->getRemaining());
        $ticketInfo->setDescripcion($request->getDescripcion());
        $ticketInfo->setIsActive(true);

        $this->repository->save($ticketInfo);

        return new CreateTicketInfoResponse(
            $ticketInfo->getIdTicketInfo(),
            $ticketInfo->getEventSlug(),
            $ticketInfo->getType(),
            $ticketInfo->getPrice(),
            $ticketInfo->getCapacity(),
            $ticketInfo->getRemaining(),
            $ticketInfo->getDescripcion(),
            $ticketInfo->getIsActive()
        );
    }
}