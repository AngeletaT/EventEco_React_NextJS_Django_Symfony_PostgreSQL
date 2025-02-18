<?php

namespace App\Event\Presentation\Assembler\Request;

use App\Event\Application\DTO\Request\CreateSubEventRequest;
use Symfony\Component\HttpFoundation\Request;

class CreateSubEventRequestAssembler
{
    public static function fromHttpRequest(Request $request): CreateSubEventRequest
    {
        $data = json_decode($request->getContent(), true);
        return new CreateSubEventRequest(
            $data['name'],
            new \DateTimeImmutable($data['startDate']),
            new \DateTimeImmutable($data['endDate']),
            $data['description'] ?? null,
            $data['urlImage'] ?? null,  // Se asume que viene como array o se puede parsear
            $data['urlPoster'] ?? null,
            $data['status']
        );
    }
}