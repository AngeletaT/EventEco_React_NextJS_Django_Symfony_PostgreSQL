<?php

namespace App\Organizer\Application\UseCase\InPort;

use App\Organizer\Application\DTO\Request\RefreshSessionRequest;
use App\Organizer\Application\DTO\Response\RefreshSessionResponse;

interface RefreshSessionInterface
{
    /**
     * Ejecuta el caso de uso para refrescar la sesión del organizer.
     *
     * @param RefreshSessionRequest $request
     * @return RefreshSessionResponse
     */
    public function refresh(RefreshSessionRequest $request): RefreshSessionResponse;
}