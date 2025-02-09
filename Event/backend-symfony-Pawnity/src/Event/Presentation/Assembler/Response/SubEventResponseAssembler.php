<?php

declare(strict_types=1);

namespace App\Event\Presentation\Assembler\Response;

use App\Event\Application\DTO\Response\GetListSubEventResponse;
use App\Event\Domain\Entity\SubEvent;
use DateTimeInterface;

class SubEventResponseAssembler
{
    public static function toDTO(SubEvent $subEvent): GetListSubEventResponse
    {
        return new GetListSubEventResponse(
            $subEvent->getIdSubEvents(),
            $subEvent->getName(),
            $subEvent->getDescription(),
            $subEvent->getStartDate(),
            $subEvent->getEndDate(),
            $subEvent->getUrlImage(),
            $subEvent->getUrlPoster(),
            $subEvent->getStatus(),
            $subEvent->isActive(),
            $subEvent->getCreatedAt(),
            $subEvent->getUpdatedAt()
        );
    }
}