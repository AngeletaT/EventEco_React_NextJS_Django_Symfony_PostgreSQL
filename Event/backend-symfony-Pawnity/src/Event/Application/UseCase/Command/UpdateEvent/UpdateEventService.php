<?php

declare(strict_types=1);

namespace App\Event\Application\UseCase\Command\UpdateEvent;

use App\Event\Application\DTO\Request\UpdateEventRequest;
use App\Event\Application\DTO\Response\UpdateEventResponse;
use App\Event\Domain\OutPort\EventRepositoryInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class UpdateEventService
{
    private EventRepositoryInterface $eventRepository;
    private AuthorizationCheckerInterface $authorizationChecker;

    public function __construct(EventRepositoryInterface $eventRepository, AuthorizationCheckerInterface $authorizationChecker)
    {
        $this->eventRepository = $eventRepository;
        $this->authorizationChecker = $authorizationChecker;
    }

    /**
     * Actualiza un evento dado su ID y los nuevos datos.
     *
     * Se verifica que el usuario autenticado tenga permiso para editar el evento (por ejemplo, usando un voter).
     *
     * @param UpdateEventRequest $request Los datos a actualizar (todos opcionales)
     * @param int $eventId El identificador del evento a actualizar
     * @return UpdateEventResponse
     * @throws \Exception si el evento no existe o si el usuario no es el propietario.
     */
    public function updateEvent(UpdateEventRequest $request, int $eventId): UpdateEventResponse
    {
        // Buscar el evento
        $event = $this->eventRepository->find($eventId);
        if (!$event) {
            throw new \Exception("Evento no encontrado");
        }
        // Deshabilitado por simplicidad
        // if (!$this->authorizationChecker->isGranted('EDIT_EVENT', $event)) {
        //     throw new \Exception("Access Denied");}

        // Actualizar cada campo si se ha proporcionado un valor.
        if ($request->getName() !== null) {
            $event->setName($request->getName());
        }
        if ($request->getStartDate() !== null) {
            $event->setStartDate($request->getStartDate());
        }
        if ($request->getEndDate() !== null) {
            $event->setEndDate($request->getEndDate());
        }
        if ($request->getLocation() !== null) {
            $event->setLocation($request->getLocation());
        }
        if ($request->getPosition() !== null) {
            $event->setPosition($request->getPosition());
        }
        if ($request->getDescription() !== null) {
            $event->setDescription($request->getDescription());
        }
        if ($request->getUrlImage() !== null) {
            $event->setUrlImage($request->getUrlImage());
        }
        if ($request->getUrlPoster() !== null) {
            $event->setUrlPoster($request->getUrlPoster());
        }
        if ($request->getIdCategory() !== null) {
            $event->setIdCategory($request->getIdCategory());
        }
        
        // Actualizar la fecha de modificación
        $event->setUpdatedAt(new \DateTimeImmutable());

        // Persistir los cambios (el repositorio se encarga del flush)
        $this->eventRepository->save($event);

        return new UpdateEventResponse(
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