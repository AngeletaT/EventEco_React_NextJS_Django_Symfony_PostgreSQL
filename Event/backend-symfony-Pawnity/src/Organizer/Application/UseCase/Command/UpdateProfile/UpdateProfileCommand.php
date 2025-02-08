<?php

declare(strict_types=1);

namespace App\Organizer\Application\UseCase\Command\UpdateProfile;

use App\Organizer\Application\DTO\Request\UpdateProfileRequest;

class UpdateProfileCommand
{
    private UpdateProfileRequest $updateProfileRequest;

    public function __construct(UpdateProfileRequest $updateProfileRequest)
    {
        $this->updateProfileRequest = $updateProfileRequest;
    }

    public function getUpdateProfileRequest(): UpdateProfileRequest
    {
        return $this->updateProfileRequest;
    }
}