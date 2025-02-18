<?php

namespace App\Event\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Event\Application\UseCase\Command\CreateSubEvent\CreateSubEventCommand;
use App\Event\Application\UseCase\Command\CreateSubEvent\CreateSubEventCommandHandler;
use App\Event\Presentation\Assembler\Request\CreateSubEventRequestAssembler;
use App\Event\Presentation\Assembler\Response\CreateSubEventResponseAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CreateSubEventProcessor extends AbstractController
{
    private CreateSubEventCommandHandler $handler;

    public function __construct(CreateSubEventCommandHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/event/{eventId}/subevent", name="create_subevent", methods={"POST"})
     */
    public function __invoke(Request $request, int $eventId): JsonResponse
    {
        try {
            $createRequest = CreateSubEventRequestAssembler::fromHttpRequest($request);
            $command = new CreateSubEventCommand($eventId, $createRequest);
            $responseDto = $this->handler->__invoke($command);
            $data = CreateSubEventResponseAssembler::toArray($responseDto);
            return new JsonResponse($data, JsonResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}