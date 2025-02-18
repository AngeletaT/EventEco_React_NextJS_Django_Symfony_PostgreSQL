<?php

namespace App\Event\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Event\Application\UseCase\Command\UpdateSubEvent\UpdateSubEventCommand;
use App\Event\Application\UseCase\Command\UpdateSubEvent\UpdateSubEventCommandHandler;
use App\Event\Presentation\Assembler\Request\UpdateSubEventRequestAssembler;
use App\Event\Presentation\Assembler\Response\UpdateSubEventResponseAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UpdateSubEventProcessor extends AbstractController
{
    private UpdateSubEventCommandHandler $handler;

    public function __construct(UpdateSubEventCommandHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/subevent/{id}", name="update_subevent", methods={"PUT"})
     */
    public function __invoke(Request $request, int $id): JsonResponse
    {
        try {
            $updateRequest = UpdateSubEventRequestAssembler::fromHttpRequest($request);
            $command = new UpdateSubEventCommand($id, $updateRequest);
            $responseDto = $this->handler->__invoke($command);
            $data = UpdateSubEventResponseAssembler::toArray($responseDto);
            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}