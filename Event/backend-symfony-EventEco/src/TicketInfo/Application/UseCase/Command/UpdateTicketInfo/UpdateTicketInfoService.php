<?php

namespace App\TicketInfo\Application\UseCase\Command\UpdateTicketInfo;

use App\TicketInfo\Application\DTO\Request\UpdateTicketInfoRequest;
use App\TicketInfo\Application\DTO\Response\UpdateTicketInfoResponse;
use App\TicketInfo\Application\UseCase\InPort\UpdateTicketInfoInterface;
use App\TicketInfo\Domain\OutPort\TicketInfoRepositoryInterface;
use App\TicketInfo\Domain\Exception\DuplicateTicketInfoException;
use App\TicketInfo\Domain\Exception\TicketInfoNotFoundException;

class UpdateTicketInfoService implements UpdateTicketInfoInterface
{
    private TicketInfoRepositoryInterface $repository;

    public function __construct(TicketInfoRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function update(int $ticketInfoId, UpdateTicketInfoRequest $request): UpdateTicketInfoResponse
    {
        $ticketInfo = $this->repository->find($ticketInfoId);
        if (!$ticketInfo) {
            throw new TicketInfoNotFoundException("TicketInfo con id {$ticketInfoId} no encontrado.");
        }

        // Actualizar los campos
        if ($request->getEventSlug() !== null) {
            $ticketInfo->setEventSlug($request->getEventSlug());
        }
        $ticketInfo->setType($request->getType());
        $ticketInfo->setPrice($request->getPrice());
        $ticketInfo->setCapacity($request->getCapacity());
        $ticketInfo->setRemaining($request->getRemaining());
        $ticketInfo->setDescripcion($request->getDescripcion());

        // Validar duplicidad
        $existing = $this->repository->findOneByEventSlugAndType($ticketInfo->getEventSlug(), $ticketInfo->getType());
        if ($existing && $existing->getIdTicketInfo() !== $ticketInfo->getIdTicketInfo()) {
            throw new DuplicateTicketInfoException();
        }

        $this->repository->save($ticketInfo);

        return new UpdateTicketInfoResponse(
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