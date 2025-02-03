<?php

namespace App\Organizer\Application\UseCase\InPort;

use App\Organizer\Application\DTO\Request\RegisterOrganizerRequest;
use App\Organizer\Application\DTO\Response\RegisterOrganizerResponse;

/**
 * InPort for creating an organizer.
 */
interface RegisterOrganizerInterface
{
    /**
     * Handles the creation of an organizer.
     *
     * @param RegisterOrganizerRequest $request DTO with organizer data.
     * @return RegisterOrganizerResponse DTO with the created organizer's details.
     */
    public function handle(RegisterOrganizerRequest $request): RegisterOrganizerResponse;
}