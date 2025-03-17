<?php
namespace App\Pet\Application\UseCase\Query\GetAdoptionsByOrg;

use App\Pet\Domain\OutPort\AdoptionRepositoryInterface;
use App\Pet\Application\DTO\Response\GetAdoptionsByOrgResponse;

class GetAdoptionsByOrgQueryHandler
{
    private AdoptionRepositoryInterface $repository;

    public function __construct(AdoptionRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function handle(GetAdoptionsByOrgQuery $query): GetAdoptionsByOrgResponse
    {
        $adoptions = $this->repository->findByOrganizerId($query->getIdOrg());

        return new GetAdoptionsByOrgResponse($adoptions);
    }
}
