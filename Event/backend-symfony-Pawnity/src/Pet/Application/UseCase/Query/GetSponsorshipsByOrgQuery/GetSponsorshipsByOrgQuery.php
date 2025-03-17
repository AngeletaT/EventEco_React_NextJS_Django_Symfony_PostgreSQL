<?php
namespace App\Pet\Application\UseCase\Query\GetSponsorshipsByOrg;

class GetSponsorshipsByOrgQuery
{
    private int $idOrg;

    public function __construct(int $idOrg)
    {
        $this->idOrg = $idOrg;
    }

    public function getIdOrg(): int
    {
        return $this->idOrg;
    }
}
