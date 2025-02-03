<?php

namespace App\Event\Presentation\InAdapter\Providers;

use App\Event\Application\UseCase\Query\ListAll\GetListEventService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Provider for listing all events with pagination.
 */
class ListAllEventsProvider
{
    private GetListEventService $service;

    public function __construct(GetListEventService $service)
    {
        $this->service = $service;
    }

    /**
     * @Route("/api/events", name="get_all_events", methods={"GET"})
     */
    public function getList(Request $request): JsonResponse
    {
        $page = max(1, (int) $request->query->get('page', 1));
        $limit = max(1, (int) $request->query->get('limit', 5));

        $paginationResult = $this->service->execute($page, $limit);

        return new JsonResponse($paginationResult, JsonResponse::HTTP_OK);
    }
}