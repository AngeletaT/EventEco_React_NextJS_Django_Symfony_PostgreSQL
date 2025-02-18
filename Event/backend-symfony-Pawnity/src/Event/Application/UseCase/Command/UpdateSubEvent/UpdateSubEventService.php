<?php

namespace App\Event\Application\UseCase\Command\UpdateSubEvent;

use App\Event\Application\DTO\Request\UpdateSubEventRequest;
use App\Event\Application\DTO\Response\UpdateSubEventResponse;
use App\Event\Application\UseCase\InPort\UpdateSubEventInterface;
use App\Event\Domain\OutPort\SubEventRepositoryInterface;
use App\Event\Domain\Entity\SubEvent;

class UpdateSubEventService implements UpdateSubEventInterface
{
    private SubEventRepositoryInterface $subEventRepository;

    public function __construct(SubEventRepositoryInterface $subEventRepository)
    {
        $this->subEventRepository = $subEventRepository;
    }

    public function updateSubEvent(int $subEventId, UpdateSubEventRequest $request): UpdateSubEventResponse
    {
        $subEvent = $this->subEventRepository->find($subEventId);
        if (!$subEvent) {
            throw new \Exception("SubEvent with id {$subEventId} not found.");
        }

        // Actualizar los campos del subevento
        $subEvent->setName($request->getName());
        $subEvent->setStartDate($request->getStartDate());
        $subEvent->setEndDate($request->getEndDate());
        $subEvent->setDescription($request->getDescription());
        $subEvent->setUrlImage($request->getUrlImage());
        $subEvent->setUrlPoster($request->getUrlPoster());
        $subEvent->setStatus($request->getStatus());
        // Actualizamos el updatedAt
        $subEvent->setUpdatedAt(new \DateTimeImmutable());

        $this->subEventRepository->save($subEvent);

        return new UpdateSubEventResponse(
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