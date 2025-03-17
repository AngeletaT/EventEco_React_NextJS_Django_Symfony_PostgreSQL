<?php
// src/Pet/Presentation/AdapterIn/Providers/GetPetsByOrganizerProvider.php

namespace App\Pet\Presentation\InAdapter\Providers;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use App\Pet\Application\UseCase\Query\GetPetsByOrganizer\GetPetsByOrganizerQuery;
use App\Pet\Application\UseCase\Query\GetPetsByOrganizer\GetPetsByOrganizerQueryHandler;

class GetPetsByOrganizerProvider
{
    private GetPetsByOrganizerQueryHandler $handler;

    public function __construct(GetPetsByOrganizerQueryHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/{idOrg}/pets", name="get_pets_by_organizer", methods={"GET"})
     */
    public function process(int $idOrg): JsonResponse
    {
        try {
            $query = new GetPetsByOrganizerQuery($idOrg);
            $response = $this->handler->handle($query);

            return new JsonResponse([
                'idOrg' => $idOrg,
                'pets' => $response->getPets()
            ], JsonResponse::HTTP_OK);

        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
