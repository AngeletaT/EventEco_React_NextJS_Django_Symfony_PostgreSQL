<?php

namespace App\Event\Application\UseCase\Query\ListAll;

use App\Event\Domain\OutPort\EventRepositoryInterface;
use App\Event\Presentation\Assembler\Response\GetListEventResponseAssembler;
use App\Event\Domain\Entity\Event;

class GetListEventService
{
    private EventRepositoryInterface $eventRepository;

    public function __construct(EventRepositoryInterface $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    public function execute(int $page, int $limit): array
    {
        $offset = ($page - 1) * $limit;
        $events = $this->eventRepository->findAllPaginated($offset, $limit);
        $total = $this->eventRepository->countAll();

        // Convertir las entidades en arrays para el DTO
        $eventArray = array_map(fn(Event $event) => [
            'idevent' => $event->getIdEvent(),
            'name' => $event->getName(),
            'startdate' => $event->getStartDate()->format('Y-m-d'),
            'enddate' => $event->getEndDate()->format('Y-m-d'),
            'location' => $event->getLocation(),
            'description' => $event->getDescription(),
            'status' => $event->getStatus(),
            'urlimage' => $event->getUrlImage(),
            'urlposter' => $event->getUrlPoster(),
            'orgid' => $event->getOrgId(),
            'idcategory' => $event->getIdCategory(),
            'createdat' => $event->getCreatedAt()->format('Y-m-d H:i:s'),
            'updatedat' => $event->getUpdatedAt()->format('Y-m-d H:i:s'),
        ], $events);

        return GetListEventResponseAssembler::toPaginatedResponse($eventArray, $page, $limit, $total);
    }
}