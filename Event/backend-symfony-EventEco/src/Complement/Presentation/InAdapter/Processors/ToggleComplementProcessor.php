<?php

namespace App\Complement\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Complement\Application\UseCase\Command\ToggleComplement\ToggleComplementCommand;
use App\Complement\Application\UseCase\Command\ToggleComplement\ToggleComplementCommandHandler;
use App\Complement\Presentation\Assembler\Response\ToggleComplementResponseAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ToggleComplementProcessor extends AbstractController
{
    private ToggleComplementCommandHandler $handler;

    public function __construct(ToggleComplementCommandHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/complement/{id}", name="toggle_complement", methods={"POST"})
     */
    public function __invoke(Request $request, int $id): JsonResponse
    {
        try {
            $command = new ToggleComplementCommand($id);
            $responseDto = $this->handler->__invoke($command);
            $data = ToggleComplementResponseAssembler::toArray($responseDto);
            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
    }
}