<?php

namespace App\Event\Presentation\Assembler\Response;

use App\Event\Application\DTO\Response\GetListEventResponse;
use App\Event\Domain\Entity\Event;

class ListEventsByCategoryResponseAssembler
{
    public static function toHttpResponse(array $events): GetListEventResponse
    {
        return new GetListEventResponse($events);
    }
}