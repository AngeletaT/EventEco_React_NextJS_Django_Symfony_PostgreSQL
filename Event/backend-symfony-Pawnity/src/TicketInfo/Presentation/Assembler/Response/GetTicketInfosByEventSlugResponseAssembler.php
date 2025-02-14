<?php

namespace App\TicketInfo\Presentation\Assembler\Response;

use App\TicketInfo\Application\DTO\Response\GetTicketInfoResponse;

class GetTicketInfosByEventSlugResponseAssembler
{
    /**
     * @param GetTicketInfoResponse[] $responses
     * @return array
     */
    public static function toArray(array $responses): array
    {
         return array_map(function(GetTicketInfoResponse $response) {
             return [
                 'idTicketInfo' => $response->getIdTicketInfo(),
                 'eventSlug'    => $response->getEventSlug(),
                 'type'         => $response->getType(),
                 'price'        => $response->getPrice(),
                 'capacity'     => $response->getCapacity(),
                 'remaining'    => $response->getRemaining(),
                 'descripcion'  => $response->getDescripcion(),
                 'isActive'     => $response->isActive(),
                 'createdAt'    => $response->getCreatedAt()->format('Y-m-d H:i:s'),
                 'updatedAt'    => $response->getUpdatedAt()->format('Y-m-d H:i:s'),
             ];
         }, $responses);
    }
}