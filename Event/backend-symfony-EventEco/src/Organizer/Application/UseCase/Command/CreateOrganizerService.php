<?php

namespace App\Organizer\Application\UseCase\Command;

use App\Organizer\Application\InPort\CreateOrganizer;
use App\Organizer\Presentation\DTO\Request\CreateOrganizerRequest;
use App\Organizer\Presentation\DTO\Response\CreateOrganizerResponse;

/**
 * Service for CreateOrganizer Use Case
 */
class CreateOrganizerService
{
    private CreateOrganizer $handler;

    public function __construct(CreateOrganizer $handler)
    {
        $this->handler = $handler;
    }

    public function execute(CreateOrganizerRequest $request): CreateOrganizerResponse
    {
        return $this->handler->handle($request);
    }
}