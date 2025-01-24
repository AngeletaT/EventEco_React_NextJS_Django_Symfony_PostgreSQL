<?php

namespace App\Organizer\Application\UseCase\InPort;

use App\Organizer\Application\DTO\Request\CreateOrganizerRequest;
use App\Organizer\Application\DTO\Response\CreateOrganizerResponse;

/**
 * InPort for creating an organizer.
 */
interface CreateOrganizer
{
    /**
     * Handles the creation of an organizer.
     *
     * @param CreateOrganizerRequest $request DTO with organizer data.
     * @return CreateOrganizerResponse DTO with the created organizer's details.
     */
    public function handle(CreateOrganizerRequest $request): CreateOrganizerResponse;
}