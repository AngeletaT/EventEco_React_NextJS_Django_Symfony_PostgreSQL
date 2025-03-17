<?php
// src/Pet/Presentation/Assemblers/Request/UpdatePetRequestAssembler.php

namespace App\Pet\Presentation\Assemblers\Request;

use Symfony\Component\HttpFoundation\Request;
use App\Pet\Application\DTO\Request\UpdatePetRequest;

class UpdatePetRequestAssembler
{
    /**
     * Convierte la solicitud HTTP en un objeto UpdatePetRequest.
     *
     * @param Request $request
     * @param string $uuid
     * @return UpdatePetRequest
     */
    public function fromHttpRequest(Request $request, string $uuid): UpdatePetRequest
    {
        $data = json_decode($request->getContent(), true);

        return new UpdatePetRequest(
            $uuid,
            $data['name'] ?? null,
            $data['species'] ?? null,
            $data['breed'] ?? null,
            $data['gender'] ?? null,
            isset($data['birthDate']) ? new \DateTime($data['birthDate']) : null,
            $data['description'] ?? null,
            $data['image'] ?? null,
            $data['status'] ?? null,
            $data['idOrg'] ?? null,
            $data['isActive'] ?? null
        );
    }
}
