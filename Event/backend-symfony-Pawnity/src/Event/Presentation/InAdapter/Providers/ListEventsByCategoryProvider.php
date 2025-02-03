<?php

namespace App\Event\Presentation\InAdapter\Providers;

use App\Event\Application\UseCase\Query\ListByCategory\ListEventsByCategoryService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Provider for listing events by category.
 */
class ListEventsByCategoryProvider
{
    // private ListEventsByCategoryService $service;

    // public function __construct(ListEventsByCategoryService $service)
    // {
    //     $this->service = $service;
    // }

    // /**
    //  * @Route("/api/events/{idCategory}", name="get_events_by_category", methods={"GET"})
    //  */
    // public function getListByCategory(int $idCategory): JsonResponse
    // {
    //     $events = $this->service->execute($idCategory);

    //     return new JsonResponse($events, JsonResponse::HTTP_OK);
    // }
}