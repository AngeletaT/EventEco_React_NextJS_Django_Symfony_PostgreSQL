<?php

namespace App\Organizer\Presentation\InAdapter;

use App\Organizer\Application\UseCase\Command\CreateOrganizerService;
use App\Organizer\Presentation\Assembler\Request\CreateOrganizerRequestAssembler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller for handling Organizer-related operations.
 */
class OrganizerController
{
    private CreateOrganizerService $service;
    private CreateOrganizerRequestAssembler $requestAssembler;

    public function __construct(
        CreateOrganizerService $service,
        CreateOrganizerRequestAssembler $requestAssembler
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