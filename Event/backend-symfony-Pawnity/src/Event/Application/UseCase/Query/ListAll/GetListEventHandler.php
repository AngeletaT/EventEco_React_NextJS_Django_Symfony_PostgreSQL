<?php

namespace App\Event\Application\UseCase\Query\ListAll;

use App\Event\Application\DTO\Response\GetListEventResponse;
use App\Event\Application\UseCase\InPort\ListAllEventsInterface;
use App\Event\Domain\OutPort\EventRepositoryInterface;
use App\Event\Presentation\Assembler\Response\GetListEventResponseAssembler;

/**
 * Handler for retrieving a list of events.
 */
class GetListEventHandler implements ListAllEventsInterface
{
    private EventRepositoryInterface $repository;

    public function __construct(EventRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function execute(): GetListEventResponse
    {
        $events = $this->repository->findAll();
        return GetListEventResponseAssembler::toHttpResponseCollection($events);
    }
}