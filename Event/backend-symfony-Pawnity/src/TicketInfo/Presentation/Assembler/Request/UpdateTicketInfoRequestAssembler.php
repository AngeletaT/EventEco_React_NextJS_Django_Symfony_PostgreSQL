<?php

namespace App\TicketInfo\Presentation\Assembler\Request;

use App\TicketInfo\Application\DTO\Request\UpdateTicketInfoRequest;
use Symfony\Component\HttpFoundation\Request;

class UpdateTicketInfoRequestAssembler
{
    public static function fromHttpRequest(Request $request): UpdateTicketInfoRequest
    {
        $data = json_decode($request->getContent(), true);

        return new UpdateTicketInfoRequest(
            $data['eventSlug'] ?? null, // Opcional: solo se actualiza si se envía
            $data['type'],
            (float)$data['price'],
            isset($data['capacity']) ? (int)$data['capacity'] : null,
            isset($data['remaining']) ? (int)$data['remaining'] : null,
            $data['descripcion'] ?? null
        );
    }
}