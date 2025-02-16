<?php

namespace App\TicketInfo\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\TicketInfo\Application\UseCase\Command\UpdateTicketInfo\UpdateTicketInfoCommand;
use App\TicketInfo\Application\UseCase\Command\UpdateTicketInfo\UpdateTicketInfoCommandHandler;
use App\TicketInfo\Presentation\Assembler\Request\UpdateTicketInfoRequestAssembler;
use App\TicketInfo\Presentation\Assembler\Response\UpdateTicketInfoResponseAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UpdateTicketInfoProcessor extends AbstractController
{
    private UpdateTicketInfoCommandHandler $handler;

    public function __construct(UpdateTicketInfoCommandHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/ticketinfo/{id}", name="update_ticket_info", methods={"PUT"})
     */
    public function __invoke(Request $request, int $id): JsonResponse
    {
        try {
            $updateRequest = UpdateTicketInfoRequestAssembler::fromHttpRequest($request);
            $command = new UpdateTicketInfoCommand($id, $updateRequest);
            $responseDto = $this->handler->__invoke($command);
            $data = UpdateTicketInfoResponseAssembler::toArray($responseDto);

            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
    }
}