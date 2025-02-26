<?php

namespace App\Event\Presentation\Assembler\Response;

use App\Event\Application\DTO\Response\GetListEventResponse;
use App\Event\Domain\Entity\Event;
use App\Event\Domain\Entity\SubEvent;

/**
 * Assembler for transforming Event entity into GetListEventResponse DTO.
 */
class GetListEventResponseAssembler
{
    /**
     * Convert a single Event entity into an array format expected by the DTO,
     * including its subevents.
     *
     * @param Event $event
     * @return array
     */
    public static function toArray(Event $event): array
    {
        return [
            'idevent'     => $event->getIdEvent(),
            'name'        => $event->getName(),
            'startdate'   => $event->getStartDate()->format('Y-m-d'),
            'enddate'     => $event->getEndDate()->format('Y-m-d'),
            'location'    => $event->getLocation(),
            'position'    => $event->getPosition(),
            'description' => $event->getDescription(),
            'status'      => $event->getStatus(),
            'urlimage'    => self::fixUrlImage($event->getUrlImage()),
            'urlposter'   => str_replace('/', '\\', $event->getUrlPoster()),
            'orgid'       => $event->getOrgId(),
            'idcategory'  => $event->getIdCategory(),
            'eventslug'   => $event->getEventSlug(),
            'isactive'    => $event->isActive(),
            'createdat'   => $event->getCreatedAt()->format('Y-m-d\TH:i:s.u\Z'),
            'updatedat'   => $event->getUpdatedAt()->format('Y-m-d\TH:i:s.u\Z'),
            'subevents'   => self::transformSubEvents($event)
        ];
    }

    /**
     * Transform the collection of subevents associated to an Event.
     *
     * @param Event $event
     * @return array
     */
    private static function transformSubEvents(Event $event): array
    {
        // Convert the Doctrine Collection to an array and map each SubEvent.
        return array_map(function (SubEvent $subEvent) {
            return self::toSubEventArray($subEvent);
        }, $event->getSubEvents()->toArray());
    }

    /**
     * Convert a single SubEvent entity into an array.
     *
     * @param SubEvent $subEvent
     * @return array
     */
    private static function toSubEventArray(SubEvent $subEvent): array
    {
        return [
            'idsubevents' => $subEvent->getIdSubEvents(),
            'name'        => $subEvent->getName(),
            'description' => $subEvent->getDescription(),
            'startdate'   => $subEvent->getStartDate()->format('Y-m-d\TH:i:s.u\Z'),
            'enddate'     => $subEvent->getEndDate()->format('Y-m-d\TH:i:s.u\Z'),
            'urlimage'    => self::fixUrlImage($subEvent->getUrlImage()),
            'urlposter'   => str_replace('/', '\\', $subEvent->getUrlPoster()),
            'status'      => $subEvent->getStatus(),
            'isactive'    => $subEvent->isActive(),
            'createdat'   => $subEvent->getCreatedAt()->format('Y-m-d\TH:i:s.u\Z'),
            'updatedat'   => $subEvent->getUpdatedAt()->format('Y-m-d\TH:i:s.u\Z'),
        ];
    }

    /**
     * Convert an array of image URLs or a JSON string into a proper array of strings.
     *
     * @param array|string|null $urlImage
     * @return array
     */
    private static function fixUrlImage($urlImage): array
    {
        if (is_string($urlImage)) {
            $decoded = json_decode($urlImage, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                return array_map(fn($path) => str_replace('/', '\\', $path), $decoded);
            }
        } elseif (is_array($urlImage)) {
            return array_map(fn($path) => str_replace('/', '\\', $path), $urlImage);
        }
        return [];
    }

    /**
     * Convert an array of Event entities into a paginated response.
     *
     * @param array $eventDTOs
     * @param int $page
     * @param int $limit
     * @param int $total
     * @return array
     */
    public static function toPaginatedResponse(array $eventDTOs, int $page, int $limit, int $total): array
    {
        return [
            'page'        => $page,
            'per_page'    => $limit,
            'total'       => $total,
            'total_pages' => ceil($total / $limit),
            'data'        => $eventDTOs
        ];
    }
}