<?php

namespace App\Organizer\Presentation\Controller;

use App\Organizer\Application\DTO\Request\CreateOrganizerRequest;
use App\Organizer\Application\DTO\Response\CreateOrganizerResponse;
use App\Organizer\Application\Handler\Command\CreateOrganizerHandler;
use App\Organizer\Application\Command\CreateOrganizerCommand;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Controller for managing organizers.
 */
class OrganizerController
{
    private CreateOrganizerHandler $handler;
    private ValidatorInterface $validator;

    /**
     * Constructor
     *
     * @param CreateOrganizerHandler $handler
     * @param ValidatorInterface $validator
     */
    public function __construct(CreateOrganizerHandler $handler, ValidatorInterface $validator)
    {
        $this->handler = $handler;
        $this->validator = $validator;
    }

    /**
     * Create a new organizer.
     *
     * @Route("/api/organizers", name="create_organizer", methods={"POST"})
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        
    $data = json_decode($request->getContent(), true);

    if (!is_array($data)) {
        return new JsonResponse(['error' => 'Invalid JSON payload'], JsonResponse::HTTP_BAD_REQUEST);
    }

    $dto = new CreateOrganizerRequest($data);

        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }

            return new JsonResponse(['errors' => $errorMessages], JsonResponse::HTTP_BAD_REQUEST);
        }

        $command = new CreateOrganizerCommand(
            $dto->email,
            $dto->password,
            $dto->nif
        );

        $organizer = $this->handler->handle($command);

        $response = new CreateOrganizerResponse(
            $organizer->getIdOrg(),
            $organizer->getUuid(),
            $organizer->getEmail(),
            $organizer->getNif(),
            $organizer->isActive(),
            $organizer->getCreatedAt(),
            $organizer->getUpdatedAt()
        );

        return new JsonResponse($response, JsonResponse::HTTP_CREATED);
    }
}