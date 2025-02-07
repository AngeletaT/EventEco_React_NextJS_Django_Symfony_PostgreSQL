<?php

declare(strict_types=1);

namespace App\Organizer\Application\InPort;

use App\Organizer\Application\DTO\Request\ProfileRequest;
use App\Organizer\Application\DTO\Response\ProfileResponse;

interface ProfileInterface
{
    /**
     * Obtiene el profile del organizer según el id extraído del token.
     *
     * @param ProfileRequest $profileRequest
     * @return ProfileResponse
     */
    public function profile(ProfileRequest $profileRequest): ProfileResponse;
}