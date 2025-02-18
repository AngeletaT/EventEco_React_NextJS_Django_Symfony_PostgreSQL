<?php

namespace App\TicketInfo\Presentation\Assembler\Response;

use App\TicketInfo\Application\DTO\Response\ToggleTicketInfoResponse;

class ToggleTicketInfoResponseAssembler
{
    public static function toArray(ToggleTicketInfoResponse $response): array
    {
        return [
            'ticketInfoId' => $response->getTicketInfoId(),
            'isActive'     => $response->isActive(),
        ];
    }
}