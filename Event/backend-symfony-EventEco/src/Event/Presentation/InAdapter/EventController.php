<?php

namespace App\Event\Presentation\InAdapter;

use App\Event\Application\UseCase\Query\GetListEventService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller for handling Event-related operations.
 */
class EventController
{
    private GetListEventService $service;

    public function __construct(GetListEventService $service)
    {
        $this->service = $service;
    }

    /**
     * @Route("/api/events", name="get_events", methods={"GET"})
     */
    public function getList(): JsonResponse
    {
        $events = $this->service->execute();

        return new JsonResponse($events, JsonResponse::HTTP_OK);
    }
}