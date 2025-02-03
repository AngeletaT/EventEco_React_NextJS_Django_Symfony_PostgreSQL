<?php

namespace App\Event\Application\DTO\Response;

use JsonSerializable;
use App\Event\Domain\Entity\Event;

/**
 * DTO for returning a list of events.
 */
class GetListEventResponse implements JsonSerializable
{
    private array $events;

    public function __construct(array $events)
    {
        $this->events = array_map(fn($event) => [
            'idevent' => $event['idevent'],
            'name' => $event['name'],
            'startdate' => $event['startDate'],
            'enddate' => $event['endDate'],
            'location' => $event['location'],
            'description' => $event['description'],
            'status' => $event['status'],
            'urlimage' => $this->normalizeUrlImage($event['urlImage']),
            'urlposter' => str_replace('\\\\', '\\', $event['urlPoster']),
            'orgid' => $event['orgId'],
            'idcategory' => $event['idCategory'],
            'createdat' => $event['createdAt'],
            'updatedat' => $event['updatedAt'],
        ], $events);
    }

    public function getData(): array
    {
        return $this->events;
    }

    /**
     * Serializa correctamente el array de imágenes asegurando que no haya estructuras JSON incorrectas.
     *
     * @param mixed $urlImage
     * @return array
     */
    private function normalizeUrlImage(mixed $urlImage): array
    {
        if (is_string($urlImage)) {
            $decoded = json_decode($urlImage, true);
            if (is_array($decoded)) {
                return array_map(fn($img) => str_replace('\\\\', '\\', $img), $decoded);
            }
        }

        if (is_array($urlImage)) {
            return array_map(fn($img) => str_replace('\\\\', '\\', $img), $urlImage);
        }

        return [];
    }

    /**
     * Implement JsonSerializable to return structured response.
     */
    public function jsonSerialize(): array
    {
        return ['events' => $this->events];
    }
}