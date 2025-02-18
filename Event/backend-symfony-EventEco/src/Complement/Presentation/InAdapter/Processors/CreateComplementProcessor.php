<?php

namespace App\Complement\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Complement\Application\UseCase\Command\CreateComplement\CreateComplementCommand;
use App\Complement\Application\UseCase\Command\CreateComplement\CreateComplementCommandHandler;
use App\Complement\Presentation\Assembler\Request\CreateComplementRequestAssembler;
use App\Complement\Presentation\Assembler\Response\CreateComplementResponseAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CreateComplementProcessor extends AbstractController
{
    private CreateComplementCommandHandler $handler;

    public function __construct(CreateComplementCommandHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/event/{eventSlug}/complement", name="create_complement", methods={"POST"})
     */
    public function __invoke(Request $request, string $eventSlug): JsonResponse
    {
        try {
            $createRequest = CreateComplementRequestAssembler::fromHttpRequest($request);
            $command = new CreateComplementCommand($eventSlug, $createRequest);
            $responseDto = $this->handler->__invoke($command);
            $data = CreateComplementResponseAssembler::toArray($responseDto);
            return new JsonResponse($data, JsonResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}