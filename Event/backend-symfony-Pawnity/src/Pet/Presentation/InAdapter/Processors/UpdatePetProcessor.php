<?php
// src/Pet/Presentation/AdapterIn/Processors/UpdatePetProcessor.php

namespace App\Pet\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use App\Pet\Application\UseCase\Command\UpdatePet\UpdatePetCommandHandler;
use App\Pet\Presentation\Assemblers\Request\UpdatePetRequestAssembler;

class UpdatePetProcessor
{
    private UpdatePetCommandHandler $handler;
    private UpdatePetRequestAssembler $assembler;

    public function __construct(UpdatePetCommandHandler $handler, UpdatePetRequestAssembler $assembler)
    {
        $this->handler = $handler;
        $this->assembler = $assembler;
    }

    /**
     * Endpoint para actualizar una mascota (Pet).
     *
     * @Route("/organizer/pets/{uuid}", name="update_pet", methods={"PUT"})
     */
    public function process(Request $request, string $uuid): JsonResponse
    {
        try {
            // Convertimos la petición HTTP a un objeto DTO (UpdatePetRequest)
            $updatePetRequest = $this->assembler->fromHttpRequest($request, $uuid);
            
            // Mapeamos el DTO al comando
            $command = $updatePetRequest->toCommand();

            // Ejecutamos el comando
            $response = $this->handler->handle($command);

            return new JsonResponse([
                'uuid' => $response->getUuid(),
                'message' => $response->getMessage()
            ], JsonResponse::HTTP_OK);

        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
