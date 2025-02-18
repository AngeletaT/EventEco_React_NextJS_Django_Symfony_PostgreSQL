<?php

namespace App\Event\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Event\Application\UseCase\Command\ToggleSubEvent\ToggleSubEventCommand;
use App\Event\Application\UseCase\Command\ToggleSubEvent\ToggleSubEventCommandHandler;
use App\Event\Presentation\Assembler\Response\ToggleSubEventResponseAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ToggleSubEventProcessor extends AbstractController
{
    private ToggleSubEventCommandHandler $handler;

    public function __construct(ToggleSubEventCommandHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/subevent/{id}", name="toggle_subevent", methods={"POST"})
     */
    public function __invoke(Request $request, int $id): JsonResponse
    {
        try {
            $command = new ToggleSubEventCommand($id);
            $responseDto = $this->handler->__invoke($command);
            $data = ToggleSubEventResponseAssembler::toArray($responseDto);
            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}