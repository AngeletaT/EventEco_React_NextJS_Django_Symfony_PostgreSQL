<?php

namespace App\Organizer\Presentation\Provider;

use App\Shared\Cache\RedisService;

class OrganizerInfoProvider
{
    private RedisService $redisService;

    public function __construct(RedisService $redisService)
    {
        $this->redisService = $redisService;
    }

    public function enrichOrganizerResponse(array $organizerData): array
    {
        // Obtener los datos del perfil del organizador desde Redis
        $profileData = $this->redisService->get('organizer-profile');

        // Decodificar los datos del perfil si están en formato JSON
        $profileData = $profileData ? json_decode($profileData, true) : [];

        // Añadir los datos del perfil a la respuesta del organizador
        return array_merge($organizerData, ['profile' => $profileData]);
    }
}