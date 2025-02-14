<?php

namespace App\TicketInfo\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\TicketInfo\Application\UseCase\Command\CreateTicketInfo\CreateTicketInfoCommand;
use App\TicketInfo\Application\UseCase\Command\CreateTicketInfo\CreateTicketInfoCommandHandler;
use App\TicketInfo\Presentation\Assembler\Response\CreateTicketInfoResponseAssembler;
use App\TicketInfo\Presentation\Assembler\Request\CreateTicketInfoRequestAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CreateTicketInfoProcessor extends AbstractController
{
    private CreateTicketInfoCommandHandler $handler;

    public function __construct(CreateTicketInfoCommandHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/event/{slug}/ticketinfo", name="create_ticket_info", methods={"POST"})
     */
    public function __invoke(Request $request, string $slug): JsonResponse
    {
        try {
            $createRequest = CreateTicketInfoRequestAssembler::fromHttpRequest($request);
            $command = new CreateTicketInfoCommand($slug, $createRequest);
            $responseDto = $this->handler->__invoke($command);
            $data = CreateTicketInfoResponseAssembler::toArray($responseDto);

            return new JsonResponse($data, JsonResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}