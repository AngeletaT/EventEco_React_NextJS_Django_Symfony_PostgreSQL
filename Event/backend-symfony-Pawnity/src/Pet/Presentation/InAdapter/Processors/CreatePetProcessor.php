<?php
// src/Pet/Presentation/AdapterIn/Processors/CreatePetProcessor.php
namespace App\Pet\Presentation\InAdapter\Processors;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use App\Pet\Application\UseCase\Command\CreatePet\CreatePetCommandHandler;
use App\Pet\Presentation\Assemblers\Request\CreatePetRequestAssembler;

class CreatePetProcessor
{
    private CreatePetCommandHandler $handler;
    private CreatePetRequestAssembler $assembler;

    public function __construct(CreatePetCommandHandler $handler, CreatePetRequestAssembler $assembler)
    {
        $this->handler = $handler;
        $this->assembler = $assembler;
    }

    /**
     * @Route("/organizer/pets", name="create_pet", methods={"POST"})
     */
    public function process(Request $request): JsonResponse
    {
        // Convertimos la petición HTTP en un objeto DTO (CreatePetRequest)
        $createPetRequest = $this->assembler->fromHttpRequest($request);
        // Mapeamos el DTO al comando
        $command = $createPetRequest->toCommand();
        // Ejecutamos el comando
        $pet = $this->handler->handle($command);
        // Se podría usar un ResponseAssembler para dar formato a la respuesta final
        return new JsonResponse([
            'uuid' => $pet->getUuid(),
            'message' => 'Pet creado exitosamente'
        ], JsonResponse::HTTP_CREATED);
    }
}
