<?php

namespace App\Organizer\Presentation\InAdapter;

use App\Organizer\Application\UseCase\Command\CreateOrganizerService;
use App\Organizer\Presentation\DTO\Request\CreateOrganizerRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller for handling Organizer-related operations.
 */
class OrganizerController
{
    private CreateOrganizerService $service;

    public function __construct(CreateOrganizerService $service)
    {
        $this->service = $service;
    }

    /**
     * @Route("/api/organizers", name="create_organizer", methods={"POST"})
     */
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $dto = new CreateOrganizerRequest($data);

        return new JsonResponse(
            $this->service->execute($dto)->jsonSerialize(),
            JsonResponse::HTTP_CREATED
        );
    }
}