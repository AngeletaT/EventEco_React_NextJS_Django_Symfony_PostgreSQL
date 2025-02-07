<?php

namespace App\Organizer\Presentation\Assembler\Request;

use Symfony\Component\HttpFoundation\Request;
use App\Organizer\Application\DTO\Request\RefreshSessionRequest;

class RefreshSessionRequestAssembler
{
    /**
     * Transforma la solicitud HTTP en un DTO de request para refrescar la sesión.
     *
     * @param Request $request
     * @return RefreshSessionRequest
     * @throws \Exception Si no se encuentra el token en el header.
     */
    public function fromHttpRequest(Request $request): RefreshSessionRequest
    {
        $authHeader = $request->headers->get('Authorization');
        if (!$authHeader || strpos($authHeader, 'Bearer ') !== 0) {
            throw new \Exception('Token no proporcionado');
        }
        $accessToken = substr($authHeader, 7);
        return new RefreshSessionRequest($accessToken);
    }
}