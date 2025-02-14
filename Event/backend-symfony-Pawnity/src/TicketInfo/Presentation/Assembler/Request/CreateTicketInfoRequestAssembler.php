<?php

namespace App\TicketInfo\Presentation\Assembler\Request;

use App\TicketInfo\Application\DTO\Request\CreateTicketInfoRequest;
use Symfony\Component\HttpFoundation\Request;

class CreateTicketInfoRequestAssembler
{
    public static function fromHttpRequest(Request $request): CreateTicketInfoRequest
    {
        // Suponiendo que los datos vienen en formato JSON
        $data = json_decode($request->getContent(), true);
        
        return new CreateTicketInfoRequest(
            $data['type'],
            (float)$data['price'],
            isset($data['capacity']) ? (int)$data['capacity'] : null,
            isset($data['remaining']) ? (int)$data['remaining'] : null,
            $data['descripcion'] ?? null
        );
    }
}