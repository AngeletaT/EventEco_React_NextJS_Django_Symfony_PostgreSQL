<?php

declare(strict_types=1);

namespace App\Organizer\Presentation\InAdapter\Processors;

use App\Organizer\Application\UseCase\Command\UpdateProfile\UpdateProfileCommand;
use App\Organizer\Application\UseCase\Command\UpdateProfile\UpdateProfileCommandHandler;
use App\Organizer\Presentation\Assembler\Request\UpdateProfileRequestAssembler;
use App\Organizer\Presentation\Assembler\Response\UpdateProfileResponseAssembler;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UpdateProfileProcessor extends AbstractController
{
    private UpdateProfileCommandHandler $handler;
    private UpdateProfileRequestAssembler $assembler;

    public function __construct(
        UpdateProfileCommandHandler $handler, 
        UpdateProfileRequestAssembler $assembler
    ) {
        $this->handler = $handler;
        $this->assembler = $assembler;
    }

    /**
     * @Route("/organizer/profile", name="update_organizer_profile", methods={"PUT", "PATCH"})
     */
    public function __invoke(Request $request): JsonResponse
    {
        try {
            // Se crea el DTO UpdateProfileRequest a partir de la request HTTP.
            $updateRequest = $this->assembler->fromHttpRequest($request);
            // Se crea el comando UpdateProfileCommand con el DTO.
            $command = new UpdateProfileCommand($updateRequest);
            // Se invoca el handler que procesa el comando y retorna el DTO UpdateProfileResponse.
            $updateResponse = $this->handler->__invoke($command);
            // Se transforma el DTO en un array para la respuesta HTTP.
            $data = UpdateProfileResponseAssembler::toArray($updateResponse);
            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
    }
}