<?php

namespace App\Event\Application\UseCase\Command\ToggleSubEvent;

use App\Event\Application\UseCase\InPort\ToggleSubEventInterface;
use App\Event\Application\DTO\Response\ToggleSubEventResponse;
use App\Event\Domain\OutPort\SubEventRepositoryInterface;

class ToggleSubEventService implements ToggleSubEventInterface
{
    private SubEventRepositoryInterface $subEventRepository;

    public function __construct(SubEventRepositoryInterface $subEventRepository)
    {
        $this->subEventRepository = $subEventRepository;
    }

    public function toggle(int $subEventId): ToggleSubEventResponse
    {
        $subEvent = $this->subEventRepository->find($subEventId);
        if (!$subEvent) {
            throw new \Exception("SubEvent with id {$subEventId} not found.");
        }

        // Invertir el valor actual de isActive
        $subEvent->setIsActive(!$subEvent->isActive());

        // Persistir el cambio
        $this->subEventRepository->save($subEvent);

        return new ToggleSubEventResponse($subEvent->getIdSubEvents(), $subEvent->isActive());
    }
}