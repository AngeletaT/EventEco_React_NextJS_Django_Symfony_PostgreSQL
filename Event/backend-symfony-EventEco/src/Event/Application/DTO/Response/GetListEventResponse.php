<?php

namespace App\Event\Application\DTO\Response;

use JsonSerializable;

/**
 * DTO for returning a list of events along with their subevents.
 */
class GetListEventResponse implements JsonSerializable
{
    private array $events;

    public function __construct(array $events)
    {
        $this->events = array_map(function ($event) {
            return [
                'idevent'    => $event['idevent'],
                'name'       => $event['name'],
                'startdate'  => $event['startDate'],
                'enddate'    => $event['endDate'],
                'location'   => $event['location'],
                'position'   => $event['position'],
                'description'=> $event['description'],
                'status'     => $event['status'],
                'urlimage'   => $this->normalizeUrlImage($event['urlImage']),
                'urlposter'  => str_replace('\\\\', '\\', $event['urlPoster']),
                'orgid'      => $event['orgId'],
                'eventslug'  => $event['eventSlug'],
                'isactive'   => $event['isActive'],
                'idcategory' => $event['idCategory'],
                'createdat'  => $event['createdAt'],
                'updatedat'  => $event['updatedAt'],
                // Aquí se añade la transformación de los subevents:
                'subevents'  => isset($event['subevents']) && is_array($event['subevents'])
                    ? array_map(function ($subEvent) {
                        return [
                            'idsubevents' => $subEvent['idsubevents'],
                            'name'        => $subEvent['name'],
                            'description' => $subEvent['description'],
                            'startdate'   => $subEvent['startDate'],
                            'enddate'     => $subEvent['endDate'],
                            'urlimage'    => $this->normalizeUrlImage($subEvent['urlImage']),
                            'urlposter'   => str_replace('\\\\', '\\', $subEvent['urlPoster']),
                            'status'      => $subEvent['status'],
                            'isactive'    => $subEvent['isActive'],
                            'createdat'   => $subEvent['createdAt'],
                            'updatedat'   => $subEvent['updatedAt'],
                        ];
                    }, $event['subevents'])
                    : [],
            ];
        }, $events);
    }

    public function getData(): array
    {
        return $this->events;
    }

    /**
     * Normaliza el campo de URL de imágenes.
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
     * Implementación de JsonSerializable para retornar la respuesta estructurada.
     */
    public function jsonSerialize(): array
    {
        return ['events' => $this->events];
    }
}