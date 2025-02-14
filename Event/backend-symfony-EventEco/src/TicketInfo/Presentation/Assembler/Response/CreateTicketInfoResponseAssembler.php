<?php

namespace App\TicketInfo\Presentation\Assembler\Response;

use App\TicketInfo\Application\DTO\Response\CreateTicketInfoResponse;

class CreateTicketInfoResponseAssembler
{
    public static function toArray(CreateTicketInfoResponse $response): array
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