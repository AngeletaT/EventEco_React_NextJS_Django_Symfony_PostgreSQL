<?php

namespace App\Event\Presentation\Assembler\Response;

use App\Event\Application\DTO\Response\CreateSubEventResponse;

class CreateSubEventResponseAssembler
{
    public static function toArray(CreateSubEventResponse $response): array
    {
        return [
            'idSubEvents' => $response->getIdSubEvents(),
            'name'        => $response->getName(),
            'description' => $response->getDescription(),
            'startDate'   => $response->getStartDate()->format('Y-m-d'),
            'endDate'     => $response->getEndDate()->format('Y-m-d'),
            'urlImage'    => $response->getUrlImage(),
            'urlPoster'   => $response->getUrlPoster(),
            'status'      => $response->getStatus(),
            'isActive'    => $response->isActive(),
            'createdAt'   => $response->getCreatedAt()->format('Y-m-d H:i:s'),
            'updatedAt'   => $response->getUpdatedAt()->format('Y-m-d H:i:s'),
        ];
    }
}