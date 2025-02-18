<?php

namespace App\Event\Application\Mapper;

use App\Event\Application\DTO\Response\GetListEventResponse;
use App\Event\Domain\Entity\Event;
use App\Shared\Mapper\MapperInterface;

class EventMapper implements MapperInterface
{
    /**
     * Maps an Event entity to a response DTO.
     *
     * @param Event $event
     * @return array The mapped response.
     */
    public static function toResponse($event): array
    {
        return [
            'idEvent' => $event->getIdEvent(),
            'name' => $event->getName(),
            'startDate' => $event->getStartDate()->format('Y-m-d'),
            'endDate' => $event->getEndDate()->format('Y-m-d'),
            'location' => $event->getLocation(),
            'position' => $event->getPosition(),
            'description' => $event->getDescription(),
            'status' => $event->getStatus(),
            'urlImage' => $event->getUrlImage(),
            'urlPoster' => $event->getUrlPoster(),
            'orgId' => $event->getOrgId(),
            'idCategory' => $event->getIdCategory(),
            'createdAt' => $event->getCreatedAt()->format('Y-m-d H:i:s'),
            'updatedAt' => $event->getUpdatedAt()->format('Y-m-d H:i:s')
        ];
    }

    /**
     * This method is not needed for listing events but is required by the interface.
     * Since we don't create `Event` entities from requests here, we'll throw an exception if it's used.
     *
     * @param array $input
     * @return void
     */
    public static function fromRequest(array $input)
    {
        throw new \BadMethodCallException("fromRequest is not implemented for EventMapper.");
    }
}