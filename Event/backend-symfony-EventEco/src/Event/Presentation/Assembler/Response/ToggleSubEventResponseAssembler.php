<?php

namespace App\Event\Presentation\Assembler\Response;

use App\Event\Application\DTO\Response\ToggleSubEventResponse;

class ToggleSubEventResponseAssembler
{
    public static function toArray(ToggleSubEventResponse $response): array
    {
        return [
            'idSubEvent' => $response->getIdSubEvent(),
            'isActive'   => $response->isActive(),
        ];
    }
}