<?php

declare(strict_types=1);

namespace App\Event\Application\UseCase\Query\ListAll;

use App\Event\Domain\OutPort\EventRepositoryInterface;
use App\Event\Infrastructure\Security\JwtTokenExtractor;

class GetListEventService
{
    private EventRepositoryInterface $eventRepository;
    private JwtTokenExtractor $tokenExtractor;

    public function __construct(
        EventRepositoryInterface $eventRepository, 
        JwtTokenExtractor $tokenExtractor
    ) {
        $this->eventRepository = $eventRepository;
        $this->tokenExtractor = $tokenExtractor;
    }

    /**
     * Retorna un array de eventos filtrados por orgId, el cual se extrae del query.
     *
     * @param GetListEventQuery $query
     * @return array
     */
    public function getListEvents(GetListEventQuery $query): array
    {
        $orgId = $query->getOrgId();
        return $this->eventRepository->findByOrganizerId($orgId);
    }

    /**
     * Extrae el orgId del token (en el header Authorization) y retorna los eventos correspondientes.
     *
     * @param string $authorizationHeader
     * @return array
     */
    public function getListEventsByToken(string $authorizationHeader): array
    {
        $orgId = $this->tokenExtractor->extractOrgIdFromToken($authorizationHeader);
        $query = new GetListEventQuery($orgId);
        return $this->getListEvents($query);
    }
}