<?php

namespace App\TicketInfo\Presentation\InAdapter\Providers;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\TicketInfo\Application\UseCase\Query\GetTicketInfosByEventSlug\GetTicketInfosByEventSlugQuery;
use App\TicketInfo\Application\UseCase\Query\GetTicketInfosByEventSlug\GetTicketInfosByEventSlugQueryHandler;
use App\TicketInfo\Presentation\Assembler\Response\GetTicketInfosByEventSlugResponseAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetTicketInfosByEventSlugProvider extends AbstractController
{
    private GetTicketInfosByEventSlugQueryHandler $handler;

    public function __construct(GetTicketInfosByEventSlugQueryHandler $handler)
    {
         $this->handler = $handler;
    }

    /**
     * @Route("/organizer/event/{eventSlug}/ticketinfo", name="get_ticketinfos_by_eventslug", methods={"GET"})
     */
    public function __invoke(Request $request, string $eventSlug): JsonResponse
    {
         try {
             $query = new GetTicketInfosByEventSlugQuery($eventSlug);
             $responseDtos = $this->handler->__invoke($query);
             $data = GetTicketInfosByEventSlugResponseAssembler::toArray($responseDtos);
             return new JsonResponse($data, JsonResponse::HTTP_OK);
         } catch (\Exception $e) {
             return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
         }
    }
}