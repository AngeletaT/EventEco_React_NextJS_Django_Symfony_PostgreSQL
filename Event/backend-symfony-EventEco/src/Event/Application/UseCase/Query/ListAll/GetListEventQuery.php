<?php

declare(strict_types=1);

namespace App\Event\Application\UseCase\Query\ListAll;

class GetListEventQuery
{
    private int $orgId;

    public function __construct(int $orgId)
    {
        $this->orgId = $orgId;
    }

    public function getOrgId(): int
    {
        return $this->orgId;
    }
}