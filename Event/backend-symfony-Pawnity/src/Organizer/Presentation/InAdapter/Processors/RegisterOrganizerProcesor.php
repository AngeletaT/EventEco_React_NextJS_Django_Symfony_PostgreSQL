<?php

namespace App\Organizer\Presentation\InAdapter\Processors;

use App\Organizer\Application\UseCase\Command\Register\RegisterOrganizerService;
use App\Organizer\Presentation\Assembler\Request\RegisterOrganizerRequestAssembler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller for handling Organizer-related operations.
 */
class RegisterOrganizerProcesor
{
    private RegisterOrganizerService $service;
    private RegisterOrganizerRequestAssembler $requestAssembler;

    public function __construct(
        RegisterOrganizerService $service,
        RegisterOrganizerRequestAssembler $requestAssembler
    ) {
        $this->service = $service;
        $this->requestAssembler = $requestAssembler;
    }

    /**
     * @Route("/api/organizers", name="create_organizer", methods={"POST"})
     */
    public function create(Request $request): JsonResponse
    {
        $dto = $this->requestAssembler->fromHttpRequest($request);

        $response = $this->service->execute($dto);

        return new JsonResponse($response->jsonSerialize(), JsonResponse::HTTP_CREATED);
    }
}