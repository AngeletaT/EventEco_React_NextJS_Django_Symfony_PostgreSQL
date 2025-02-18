<?php

declare(strict_types=1);

namespace App\Event\Application\UseCase\Command\CreateEvent;

use App\Event\Application\DTO\Request\CreateEventRequest;
use App\Event\Application\DTO\Response\CreateEventResponse;
use App\Event\Domain\OutPort\EventRepositoryInterface;
use App\Event\Domain\Entity\Event;

class CreateEventService
{
    private EventRepositoryInterface $eventRepository;

    public function __construct(EventRepositoryInterface $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    /**
     * Crea un evento usando los datos del request y el orgId extraído del token.
     *
     * @param CreateEventRequest $request
     * @param int $orgId
     * @return CreateEventResponse
     */
    public function createEvent(CreateEventRequest $request, int $orgId): CreateEventResponse
    {
        // Crea la entidad Event; se asigna el orgId extraído del token.
        $event = new Event(
            $request->getName(),
            $request->getStartDate(),
            $request->getEndDate(),
            $request->getLocation(),
            $request->getPosition(),
            $request->getDescription(),
            $request->getStatus(),
            $request->getUrlImage(),
            $request->getUrlPoster(),
            $orgId,
            $request->getIdCategory()
        );

        // Persistir el evento (el repositorio debe gestionar el flush).
        $this->eventRepository->save($event);

        return new CreateEventResponse(
            $event->getIdEvent(),
            $event->getName(),
            $event->getStartDate(),
            $event->getEndDate(),
            $event->getLocation(),
            $event->getPosition(),
            $event->getDescription(),
            $event->getStatus(),
            $event->getUrlImage(),
            $event->getUrlPoster(),
            $event->getOrgId(),
            $event->getIdCategory(),
            $event->getCreatedAt(),
            $event->getUpdatedAt()
        );
    }
}