<?php

namespace App\TicketInfo\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\TicketInfo\Application\UseCase\Command\ToggleTicketInfo\ToggleTicketInfoCommand;
use App\TicketInfo\Application\UseCase\Command\ToggleTicketInfo\ToggleTicketInfoCommandHandler;
use App\TicketInfo\Presentation\Assembler\Response\ToggleTicketInfoResponseAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ToggleTicketInfoProcessor extends AbstractController
{
    private ToggleTicketInfoCommandHandler $handler;

    public function __construct(ToggleTicketInfoCommandHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/ticketinfo/{id}", name="toggle_ticketinfo", methods={"POST"})
     */
    public function __invoke(Request $request, int $id): JsonResponse
    {
        try {
            $command = new ToggleTicketInfoCommand($id);
            $responseDto = $this->handler->__invoke($command);
            $data = ToggleTicketInfoResponseAssembler::toArray($responseDto);
            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}