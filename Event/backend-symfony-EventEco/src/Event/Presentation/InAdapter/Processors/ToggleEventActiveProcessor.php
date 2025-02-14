<?php

namespace App\Event\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Event\Application\UseCase\Command\ToggleEventActive\ToggleEventActiveCommand;
use App\Event\Application\UseCase\Command\ToggleEventActive\ToggleEventActiveCommandHandler;
use App\Event\Presentation\Assembler\Response\ToggleEventActiveResponseAssembler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ToggleEventActiveProcessor extends AbstractController
{
    private ToggleEventActiveCommandHandler $handler;
    
    public function __construct(ToggleEventActiveCommandHandler $handler)
    {
        $this->handler = $handler;
    }
    
    /**
     * @Route("/organizer/event/{id}/active", name="toggle_event_active", methods={"POST"})
     */
    public function __invoke(Request $request, int $id): JsonResponse
    {
        try {
            // Crear el comando de toggle usando el id del evento
            $command = new ToggleEventActiveCommand($id);
            
            // Ejecutar el handler que procesa el comando y devuelve un DTO de respuesta
            $toggleResponse = $this->handler->__invoke($command);
            
            // Transformar el DTO en un array mediante el assembler
            $data = ToggleEventActiveResponseAssembler::toArray($toggleResponse);
            
            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
    }
}