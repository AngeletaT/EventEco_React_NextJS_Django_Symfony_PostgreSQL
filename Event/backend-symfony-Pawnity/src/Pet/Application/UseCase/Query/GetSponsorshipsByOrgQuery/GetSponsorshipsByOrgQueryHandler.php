<?php
namespace App\Pet\Application\UseCase\Query\GetSponsorshipsByOrg;

use App\Pet\Domain\OutPort\SponsorshipRepositoryInterface;
use App\Pet\Application\DTO\Response\GetSponsorshipsByOrgResponse;

class GetSponsorshipsByOrgQueryHandler
{
    private SponsorshipRepositoryInterface $repository;

    public function __construct(SponsorshipRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function handle(GetSponsorshipsByOrgQuery $query): GetSponsorshipsByOrgResponse
    {
        $sponsorships = $this->repository->findByOrganizerId($query->getIdOrg());

        return new GetSponsorshipsByOrgResponse($sponsorships);
    }
}
