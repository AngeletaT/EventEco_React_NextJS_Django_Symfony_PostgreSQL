<?php

namespace App\TicketInfo\Presentation\Assembler\Response;

use App\TicketInfo\Application\DTO\Response\UpdateTicketInfoResponse;

class UpdateTicketInfoResponseAssembler
{
    public static function toArray(UpdateTicketInfoResponse $response): array
    {
        return [
            'idTicketInfo' => $response->getIdTicketInfo(),
            'eventSlug'    => $response->getEventSlug(),
            'type'         => $response->getType(),
            'price'        => $response->getPrice(),
            'capacity'     => $response->getCapacity(),
            'remaining'    => $response->getRemaining(),
            'descripcion'  => $response->getDescripcion(),
            'isActive'     => $response->isActive(),
        ];
    }
}