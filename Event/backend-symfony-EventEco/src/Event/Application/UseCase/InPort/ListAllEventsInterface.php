<?php

namespace App\Event\Application\UseCase\InPort;

use App\Event\Application\DTO\Response\GetListEventResponse;

/**
 * Interface for retrieving a list of events.
 */
interface ListAllEventsInterface
{
    /**
     * Retrieves a list of events.
     *
     * @return GetListEventResponse
     */
    public function execute(): GetListEventResponse;
}