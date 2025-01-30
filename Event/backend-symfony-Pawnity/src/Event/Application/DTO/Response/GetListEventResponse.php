<?php

namespace App\Event\Application\DTO\Response;

use JsonSerializable;
use App\Event\Domain\Entity\Event;

/**
 * DTO for returning a list of events.
 */
class GetListEventResponse implements JsonSerializable
{
    /**
     * @var array
     */
    private array $events;

    public function __construct(array $events)
    {
        $this->events = array_map(fn(Event $event) => [
            'idevent' => $event->getIdEvent(),
            'name' => $event->getName(),
            'startdate' => $event->getStartDate()->format('Y-m-d'),
            'enddate' => $event->getEndDate()->format('Y-m-d'),
            'location' => $event->getLocation(),
            'description' => $event->getDescription(),
            'status' => $event->getStatus(),
            'urlimage' => $this->normalizeUrlImage($event->getUrlImage()), // ← Aquí corregimos la serialización
            'urlposter' => str_replace('\\\\', '\\', $event->getUrlPoster()), // Corregir las barras en el poster
            'orgid' => $event->getOrgId(),
            'idcategory' => $event->getIdCategory(),
            'createdat' => $event->getCreatedAt()->format('Y-m-d H:i:s'),
            'updatedat' => $event->getUpdatedAt()->format('Y-m-d H:i:s'),
        ], $events);
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
            // Intentar decodificar si está en formato JSON
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