<?php

declare(strict_types=1);

namespace App\Event\Application\UseCase\Query\ListAll;

class GetListEventHandler
{
    private GetListEventService $service;

    public function __construct(GetListEventService $service)
    {
        $this->service = $service;
    }

    /**
     * Método invocable que procesa el query y retorna la lista de eventos.
     *
     * @param GetListEventQuery $query
     * @return array
     */
    public function __invoke(GetListEventQuery $query): array
    {
        return $this->service->getListEvents($query);
    }

    /**
     * Alternativa para procesar la petición a partir del header Authorization.
     *
     * @param string $authorizationHeader
     * @return array
     */
    public function getListEventsByToken(string $authorizationHeader): array
    {
        return $this->service->getListEventsByToken($authorizationHeader);
    }
}