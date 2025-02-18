<?php

namespace App\Event\Application\UseCase\Command\CreateSubEvent;

use App\Event\Application\DTO\Request\CreateSubEventRequest;
use App\Event\Application\DTO\Response\CreateSubEventResponse;
use App\Event\Application\UseCase\InPort\CreateSubEventInterface;
use App\Event\Domain\OutPort\EventRepositoryInterface;
use App\Event\Domain\OutPort\SubEventRepositoryInterface;
use App\Event\Domain\Entity\SubEvent;

class CreateSubEventService implements CreateSubEventInterface
{
    private EventRepositoryInterface $eventRepository;
    private SubEventRepositoryInterface $subEventRepository;

    public function __construct(
        EventRepositoryInterface $eventRepository,
        SubEventRepositoryInterface $subEventRepository
    ) {
        $this->eventRepository = $eventRepository;
        $this->subEventRepository = $subEventRepository;
    }

    public function createSubEvent(int $eventId, CreateSubEventRequest $request): CreateSubEventResponse
    {
        // Recuperar el Event al que se asociará el subevento
        $event = $this->eventRepository->find($eventId);
        if (!$event) {
            throw new \Exception("Event with id {$eventId} not found.");
        }

        // Crear el subevento
        $subEvent = new SubEvent(
            $request->getName(),
            $request->getStartDate(),
            $request->getEndDate(),
            $request->getDescription(),
            $request->getUrlImage(),
            $request->getUrlPoster(),
            $request->getStatus(),
            $event
        );

        // Persistir el subevento
        $this->subEventRepository->save($subEvent);

        return new CreateSubEventResponse(
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