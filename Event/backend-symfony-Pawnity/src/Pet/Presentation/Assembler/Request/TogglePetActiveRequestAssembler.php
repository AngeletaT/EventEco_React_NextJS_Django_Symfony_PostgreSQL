<?php
// src/Pet/Presentation/Assemblers/Request/TogglePetActiveRequestAssembler.php

namespace App\Pet\Presentation\Assemblers\Request;

use Symfony\Component\HttpFoundation\Request;
use App\Pet\Application\DTO\Request\TogglePetActiveRequest;

class TogglePetActiveRequestAssembler
{
    /**
     * Convierte la solicitud HTTP en un objeto TogglePetActiveRequest.
     *
     * @param Request $request
     * @param string $uuid
     * @return TogglePetActiveRequest
     */
    public function fromHttpRequest(Request $request, string $uuid): TogglePetActiveRequest
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['isActive'])) {
            throw new \InvalidArgumentException("The 'isActive' field is required.");
        }

        return new TogglePetActiveRequest(
            $uuid,
            filter_var($data['isActive'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false
        );
    }
}
