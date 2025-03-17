<?php
namespace App\Pet\Presentation\InAdapter\Providers;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use App\Pet\Application\UseCase\Query\GetAdoptionsByOrg\GetAdoptionsByOrgQuery;
use App\Pet\Application\UseCase\Query\GetAdoptionsByOrg\GetAdoptionsByOrgQueryHandler;

class GetAdoptionsByOrgProvider
{
    private GetAdoptionsByOrgQueryHandler $handler;

    public function __construct(GetAdoptionsByOrgQueryHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/{idOrg}/adoptions", name="get_adoptions_by_org", methods={"GET"})
     */
    public function process(int $idOrg): JsonResponse
    {
        try {
            $query = new GetAdoptionsByOrgQuery($idOrg);
            $response = $this->handler->handle($query);

            return new JsonResponse([
                'idOrg' => $idOrg,
                'adoptions' => $response->getAdoptions()
            ], JsonResponse::HTTP_OK);

        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
