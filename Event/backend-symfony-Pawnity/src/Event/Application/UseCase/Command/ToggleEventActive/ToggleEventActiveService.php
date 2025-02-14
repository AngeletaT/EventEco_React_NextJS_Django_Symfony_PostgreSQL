<?php

namespace App\Event\Application\UseCase\Command\ToggleEventActive;

use App\Event\Domain\OutPort\EventRepositoryInterface;
use App\Event\Domain\Exception\EventNotFoundException;

class ToggleEventActiveService
{
    private EventRepositoryInterface $eventRepository;

    public function __construct(EventRepositoryInterface $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    /**
     * Cambia el estado de isActive del evento.
     *
     * @param int $eventId
     * @return bool El nuevo estado de isActive.
     *
     * @throws EventNotFoundException Si el evento no existe.
     */
    public function toggle(int $eventId): bool
    {
        $event = $this->eventRepository->find($eventId);
        if (!$event) {
            throw new EventNotFoundException("Evento no encontrado");
        }

        // Realiza el toggle del estado
        $event->disable();

        // Persiste los cambios
        $this->eventRepository->save($event);

        return $event->isActive();
    }
}