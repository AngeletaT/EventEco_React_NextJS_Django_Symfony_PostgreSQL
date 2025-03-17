<?php
namespace App\Pet\Presentation\InAdapter\Providers;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use App\Pet\Application\UseCase\Query\GetSponsorshipsByOrg\GetSponsorshipsByOrgQuery;
use App\Pet\Application\UseCase\Query\GetSponsorshipsByOrg\GetSponsorshipsByOrgQueryHandler;

class GetSponsorshipsByOrgProvider
{
    private GetSponsorshipsByOrgQueryHandler $handler;

    public function __construct(GetSponsorshipsByOrgQueryHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizer/{idOrg}/sponsorships", name="get_sponsorships_by_org", methods={"GET"})
     */
    public function process(int $idOrg): JsonResponse
    {
        try {
            $query = new GetSponsorshipsByOrgQuery($idOrg);
            $response = $this->handler->handle($query);

            return new JsonResponse([
                'idOrg' => $idOrg,
                'sponsorships' => $response->getSponsorships()
            ], JsonResponse::HTTP_OK);

        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
