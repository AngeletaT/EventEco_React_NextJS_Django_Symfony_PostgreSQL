<?php

namespace App\Complement\Presentation\InAdapter\Providers;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Complement\Application\UseCase\Query\GetComplementsByEventSlug\GetComplementsByEventSlugQuery;
use App\Complement\Application\UseCase\Query\GetComplementsByEventSlug\GetComplementsByEventSlugQueryHandler;
use App\Complement\Presentation\Assembler\Response\GetComplementsByEventSlugResponseAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetComplementsByEventSlugProvider extends AbstractController
{
    private GetComplementsByEventSlugQueryHandler $handler;

    public function __construct(GetComplementsByEventSlugQueryHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/event/{eventSlug}/complement", name="get_complements_by_eventslug", methods={"GET"})
     */
    public function __invoke(Request $request, string $eventSlug): JsonResponse
    {
        try {
            $query = new GetComplementsByEventSlugQuery($eventSlug);
            $responseDtos = $this->handler->__invoke($query);
            $data = GetComplementsByEventSlugResponseAssembler::toArray($responseDtos);
            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}