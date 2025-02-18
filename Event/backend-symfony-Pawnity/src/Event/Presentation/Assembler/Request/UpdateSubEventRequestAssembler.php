<?php

namespace App\Event\Presentation\Assembler\Request;

use App\Event\Application\DTO\Request\UpdateSubEventRequest;
use Symfony\Component\HttpFoundation\Request;

class UpdateSubEventRequestAssembler
{
    public static function fromHttpRequest(Request $request): UpdateSubEventRequest
    {
        $data = json_decode($request->getContent(), true);

        return new UpdateSubEventRequest(
            $data['name'],
            new \DateTimeImmutable($data['startDate']),
            new \DateTimeImmutable($data['endDate']),
            $data['description'] ?? null,
            $data['urlImage'] ?? null,  // se espera array
            $data['urlPoster'] ?? null,
            $data['status']
        );
    }
}