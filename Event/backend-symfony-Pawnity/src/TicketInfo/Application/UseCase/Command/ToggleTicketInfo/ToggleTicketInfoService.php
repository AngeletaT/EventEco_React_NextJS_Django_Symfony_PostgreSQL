<?php

namespace App\TicketInfo\Application\UseCase\Command\ToggleTicketInfo;

use App\TicketInfo\Application\UseCase\InPort\ToggleTicketInfoInterface;
use App\TicketInfo\Application\DTO\Response\ToggleTicketInfoResponse;
use App\TicketInfo\Domain\OutPort\TicketInfoRepositoryInterface;
use App\TicketInfo\Domain\Exception\TicketInfoNotFoundException;

class ToggleTicketInfoService implements ToggleTicketInfoInterface
{
    private TicketInfoRepositoryInterface $repository;

    public function __construct(TicketInfoRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function toggle(int $ticketInfoId): ToggleTicketInfoResponse
    {
        $ticketInfo = $this->repository->find($ticketInfoId);
        if (!$ticketInfo) {
            throw new TicketInfoNotFoundException("TicketInfo con id {$ticketInfoId} no encontrado.");
        }

        // Realizar el toggle: invertir el valor actual de isActive
        $ticketInfo->setIsActive(!$ticketInfo->getisActive());

        $this->repository->save($ticketInfo);

        return new ToggleTicketInfoResponse($ticketInfo->getIdTicketInfo(), $ticketInfo->getisActive());
    }
}