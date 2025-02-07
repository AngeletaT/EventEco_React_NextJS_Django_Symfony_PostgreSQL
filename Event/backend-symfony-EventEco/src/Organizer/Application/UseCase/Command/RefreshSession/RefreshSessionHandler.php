<?php

namespace App\Organizer\Application\UseCase\Command\RefreshSession;

use App\Organizer\Application\DTO\Request\RefreshSessionRequest;
use App\Organizer\Application\DTO\Response\RefreshSessionResponse;
use App\Organizer\Application\UseCase\InPort\RefreshSessionInterface;

class RefreshSessionHandler
{
    private RefreshSessionInterface $refreshSessionService;

    public function __construct(RefreshSessionInterface $refreshSessionService)
    {
        $this->refreshSessionService = $refreshSessionService;
    }

    /**
     * Invoca el caso de uso a partir del comando y retorna el DTO de respuesta.
     *
     * @param RefreshSessionCommand $command
     * @return RefreshSessionResponse
     */
    public function __invoke(RefreshSessionCommand $command): RefreshSessionResponse
    {
        // Se crea el DTO de request a partir del comando
        $requestDTO = new RefreshSessionRequest($command->getAccessToken());
        return $this->refreshSessionService->refresh($requestDTO);
    }
}