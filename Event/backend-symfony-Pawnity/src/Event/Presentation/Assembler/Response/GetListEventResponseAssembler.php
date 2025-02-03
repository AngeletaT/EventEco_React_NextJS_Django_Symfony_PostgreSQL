<?php

namespace App\Event\Presentation\Assembler\Response;

use App\Event\Application\DTO\Response\GetListEventResponse;
use App\Event\Domain\Entity\Event;

/**
 * Assembler for transforming Event entity into GetListEventResponse DTO.
 */
class GetListEventResponseAssembler
{
    /**
     * Convert a single Event entity into an array format expected by the DTO.
     *
     * @param Event $event
     * @return array
     */
    public static function toArray(Event $event): array
    {
        return [
            'idevent' => $event->getIdEvent(),
            'name' => $event->getName(),
            'startdate' => $event->getStartDate()->format('Y-m-d'),
            'enddate' => $event->getEndDate()->format('Y-m-d'),
            'location' => $event->getLocation(),
            'description' => $event->getDescription(),
            'status' => $event->getStatus(),
            'urlimage' => self::fixUrlImage($event->getUrlImage()),
            'urlposter' => str_replace('/', '\\', $event->getUrlPoster()),
            'orgid' => $event->getOrgId(),
            'idcategory' => $event->getIdCategory(),
            'createdat' => $event->getCreatedAt()->format('Y-m-d\TH:i:s.u\Z'),
            'updatedat' => $event->getUpdatedAt()->format('Y-m-d\TH:i:s.u\Z'),
        ];
    }

    /**
     * Convert an array of Event entities into a paginated response.
     *
     * @param Event[] $events
     * @param int $page
     * @param int $limit
     * @param int $total
     * @return array
     */
    public static function toPaginatedResponse(array $eventDTOs, int $page, int $limit, int $total): array
    {
        return [
            'page' => $page,
            'per_page' => $limit,
            'total' => $total,
            'total_pages' => ceil($total / $limit),
            'data' => $eventDTOs
        ];
    }

    /**
     * Fix urlImage format to ensure it's a proper array of strings.
     *
     * @param array|string|null $urlImage
     * @return array
     */
    private static function fixUrlImage($urlImage): array
    {
        if (is_string($urlImage)) {
            $decoded = json_decode($urlImage, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return array_map(fn($path) => str_replace('/', '\\', $path), $decoded);
            }
        } elseif (is_array($urlImage)) {
            return array_map(fn($path) => str_replace('/', '\\', $path), $urlImage);
        }
        return [];
    }
}