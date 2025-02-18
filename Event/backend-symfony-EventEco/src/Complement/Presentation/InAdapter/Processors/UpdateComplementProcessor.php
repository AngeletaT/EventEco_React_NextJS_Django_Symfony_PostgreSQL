<?php

namespace App\Complement\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Complement\Application\UseCase\Command\UpdateComplement\UpdateComplementCommand;
use App\Complement\Application\UseCase\Command\UpdateComplement\UpdateComplementCommandHandler;
use App\Complement\Presentation\Assembler\Request\UpdateComplementRequestAssembler;
use App\Complement\Presentation\Assembler\Response\UpdateComplementResponseAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UpdateComplementProcessor extends AbstractController
{
    private UpdateComplementCommandHandler $handler;

    public function __construct(UpdateComplementCommandHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/complement/{id}", name="update_complement", methods={"PUT"})
     */
    public function __invoke(Request $request, int $id): JsonResponse
    {
        try {
            $updateRequest = UpdateComplementRequestAssembler::fromHttpRequest($request);
            $command = new UpdateComplementCommand($id, $updateRequest);
            $responseDto = $this->handler->__invoke($command);
            $data = UpdateComplementResponseAssembler::toArray($responseDto);
            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}