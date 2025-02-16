<?php

namespace App\TicketInfo\Application\UseCase\InPort;

use App\TicketInfo\Application\DTO\Request\CreateTicketInfoRequest;
use App\TicketInfo\Application\DTO\Response\CreateTicketInfoResponse;

interface CreateTicketInfoInterface
{
    public function create(string $eventSlug, CreateTicketInfoRequest $request): CreateTicketInfoResponse;
}