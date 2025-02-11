<?php

declare(strict_types=1);

namespace App\Event\Presentation\InAdapter\Processors;

use App\Event\Application\DTO\Response\UpdateEventResponse;
use App\Event\Application\UseCase\Command\UpdateEvent\UpdateEventCommand;
use App\Event\Application\UseCase\Command\UpdateEvent\UpdateEventCommandHandler;
use App\Event\Presentation\Assembler\Request\UpdateEventRequestAssembler;
use App\Event\Presentation\Assembler\Response\UpdateEventResponseAssembler;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UpdateEventProcessor extends AbstractController
{
    private UpdateEventCommandHandler $handler;

    public function __construct(UpdateEventCommandHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/event/{id}", name="update_event", methods={"PUT", "PATCH"})
     *
     * Actualiza el evento cuyo ID se pasa en la URL. La request HTTP contiene los datos opcionales a actualizar.
     */
    public function __invoke(Request $request, int $id): JsonResponse
    {
        try {
            // Transformar el cuerpo de la request en un DTO UpdateEventRequest.
            $updateRequest = UpdateEventRequestAssembler::fromHttpRequest($request);
            
            // Crear el comando de actualización usando el ID del evento y el DTO.
            $command = new UpdateEventCommand($id, $updateRequest);
            
            // Invocar el handler que procesa el comando y devuelve un UpdateEventResponse.
            $updateResponse = $this->handler->__invoke($command);
            
            // Transformar el DTO de respuesta en un array.
            $data = UpdateEventResponseAssembler::toArray($updateResponse);
            
            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
    }
}