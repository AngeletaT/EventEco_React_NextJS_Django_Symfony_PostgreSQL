<?php

declare(strict_types=1);

namespace App\Event\Presentation\Assembler\Response;

use App\Event\Application\DTO\Response\CreateEventResponse;

class CreateEventResponseAssembler
{
    public static function toArray(CreateEventResponse $response): array
    {
        return [
            'idevent'    => $response->getIdEvent(),
            'name'       => $response->getName(),
            'startdate'  => $response->getStartDate()->format('Y-m-d'),
            'enddate'    => $response->getEndDate()->format('Y-m-d'),
            'location'   => $response->getLocation(),
            'description'=> $response->getDescription(),
            'status'     => $response->getStatus(),
            'urlimage'   => $response->getUrlImage(),
            'urlposter'  => $response->getUrlPoster(),
            'orgid'      => $response->getOrgId(),
            'idcategory' => $response->getIdCategory(),
            'createdat'  => $response->getCreatedAt()->format('Y-m-d\TH:i:s.u\Z'),
            'updatedat'  => $response->getUpdatedAt()->format('Y-m-d\TH:i:s.u\Z'),
        ];
    }
}