<?php

declare(strict_types=1);

namespace App\Organizer\Application\UseCase\Query;

use App\Organizer\Application\DTO\Request\ProfileRequest;
use App\Organizer\Application\DTO\Response\ProfileResponse;

class ProfileQueryHandler
{
    private ProfileQueryService $profileQueryService;

    public function __construct(ProfileQueryService $profileQueryService)
    {
        $this->profileQueryService = $profileQueryService;
    }

    /**
     * Método invocable para gestionar la petición de obtener el profile.
     *
     * @param ProfileQuery $query
     * @return ProfileResponse
     */
    public function __invoke(ProfileQuery $query): ProfileResponse
    {
        // Se transforma el ProfileQuery en un DTO ProfileRequest
        $profileRequest = new ProfileRequest($query->getIdOrg());
        return $this->profileQueryService->profile($profileRequest);
    }
}