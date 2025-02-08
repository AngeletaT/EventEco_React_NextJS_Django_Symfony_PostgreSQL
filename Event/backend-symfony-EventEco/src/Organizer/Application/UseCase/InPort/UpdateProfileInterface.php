<?php

declare(strict_types=1);

namespace App\Organizer\Application\UseCase\InPort;

use App\Organizer\Application\DTO\Request\UpdateProfileRequest;
use App\Organizer\Application\DTO\Response\UpdateProfileResponse;

interface UpdateProfileInterface
{
    public function updateProfile(UpdateProfileRequest $request): UpdateProfileResponse;
}