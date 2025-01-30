<?php

namespace App\Event\Application\UseCase\Query;

use App\Event\Application\DTO\Response\GetListEventResponse;
use App\Event\Application\Mapper\EventMapper;
use App\Event\Domain\OutPort\EventRepositoryInterface;

class GetListEventService
{
    private EventRepositoryInterface $eventRepository;
    private EventMapper $eventMapper;

    public function __construct(EventRepositoryInterface $eventRepository, EventMapper $eventMapper)
    {
        $this->eventRepository = $eventRepository;
        $this->eventMapper = $eventMapper;
    }

    /**
     * Retrieve all events and return them as a GetListEventResponse DTO.
     *
     * @return GetListEventResponse
     */
    public function execute(): GetListEventResponse
    {
        $events = $this->eventRepository->findAll();
        return new GetListEventResponse($events);
    }
}