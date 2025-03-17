<?php
// src/Pet/Presentation/AdapterIn/Processors/TogglePetActiveProcessor.php

namespace App\Pet\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use App\Pet\Application\UseCase\Command\TogglePetActive\TogglePetActiveCommandHandler;
use App\Pet\Application\UseCase\Command\TogglePetActive\TogglePetActiveCommand;

class TogglePetActiveProcessor
{
    private TogglePetActiveCommandHandler $handler;

    public function __construct(TogglePetActiveCommandHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/pets/{uuid}/toggle", name="toggle_pet_active", methods={"PATCH"})
     */
    public function process(Request $request, string $uuid): JsonResponse
    {
        try {
            // Crear el comando con el UUID y ejecutar el handler
            $command = new TogglePetActiveCommand($uuid);
            $response = $this->handler->handle($command);

            return new JsonResponse([
                'uuid' => $response->getUuid(),
                'isActive' => $response->getIsActive(),
                'message' => $response->getMessage()
            ], JsonResponse::HTTP_OK);

        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
