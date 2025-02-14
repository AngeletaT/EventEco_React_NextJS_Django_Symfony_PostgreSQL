<?php

namespace App\Event\Presentation\Assembler\Response;

use App\Event\Application\DTO\Response\ToggleEventActiveResponse;

class ToggleEventActiveResponseAssembler
{
    public static function assemble(int $eventId, bool $isActive): ToggleEventActiveResponse
    {
        return new ToggleEventActiveResponse($eventId, $isActive);
    }
    
    public static function toArray(ToggleEventActiveResponse $response): array
    {
        return [
            'id' => $response->getEventId(),
            'isActive' => $response->isActive()
        ];
    }
}