<?php

namespace App\TicketInfo\Application\UseCase\InPort;

use App\TicketInfo\Application\DTO\Response\GetTicketInfoResponse;

interface GetTicketInfosByEventSlugInterface
{
    /**
     * Obtiene un array de TicketInfo para un eventSlug dado.
     *
     * @param string $eventSlug
     * @return GetTicketInfoResponse[]
     */
    public function getTicketInfos(string $eventSlug): array;
}