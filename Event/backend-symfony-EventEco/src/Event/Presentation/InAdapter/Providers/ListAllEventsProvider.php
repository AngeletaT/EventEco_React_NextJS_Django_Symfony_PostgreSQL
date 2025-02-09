<?php

declare(strict_types=1);

namespace App\Event\Presentation\InAdapter\Providers;

use App\Event\Application\UseCase\Query\ListAll\GetListEventHandler;
use App\Event\Presentation\Assembler\Response\GetListEventResponseAssembler;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ListAllEventsProvider extends AbstractController
{
    private GetListEventHandler $handler;

    public function __construct(GetListEventHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/events", name="list_all_events", methods={"GET"})
     */
    public function __invoke(Request $request): JsonResponse
    {
        try {
            $authorizationHeader = $request->headers->get('Authorization');
            if (!$authorizationHeader) {
                throw new \InvalidArgumentException('Token no proporcionado');
            }
            
            // Delegamos toda la lógica al handler y al service.
            $events = $this->handler->getListEventsByToken($authorizationHeader);
            
            // Transformamos cada evento usando el assembler.
            $data = array_map(
                fn($event) => GetListEventResponseAssembler::toArray($event),
                $events
            );
            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
    }
}