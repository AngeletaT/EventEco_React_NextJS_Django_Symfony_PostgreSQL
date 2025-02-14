<?php

namespace App\TicketInfo\Domain\OutPort;

use App\TicketInfo\Domain\Entity\TicketInfo;

interface TicketInfoRepositoryInterface
{
    /**
     * Persiste o actualiza la entidad TicketInfo en la base de datos.
     */
    public function save(TicketInfo $ticketInfo): void;

    /**
     * Busca un TicketInfo por su ID.
     *
     * @param int $id
     * @return TicketInfo|null
     */
    public function find(int $id): ?TicketInfo;
    
    // Aquí podrías agregar otros métodos (por ejemplo, update, disable, etc.) según las necesidades.
}