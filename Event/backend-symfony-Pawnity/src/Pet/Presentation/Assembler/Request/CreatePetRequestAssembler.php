<?php
// src/Pet/Presentation/Assemblers/Request/CreatePetRequestAssembler.php
namespace App\Pet\Presentation\Assemblers\Request;

use Symfony\Component\HttpFoundation\Request;
use App\Pet\Application\DTO\Request\CreatePetRequest;

class CreatePetRequestAssembler
{
    /**
     * Transforma la petición HTTP en un objeto CreatePetRequest.
     *
     * @param Request $request
     * @return CreatePetRequest
     */
    public function fromHttpRequest(Request $request): CreatePetRequest
    {
        $data = json_decode($request->getContent(), true);
        
        return new CreatePetRequest(
            $data['name'] ?? '',
            $data['species'] ?? '',
            $data['gender'] ?? '',
            new \DateTime($data['birthDate'] ?? 'now'),
            $data['idOrg'] ?? 0,
            $data['breed'] ?? null,
            $data['description'] ?? null,
            $data['image'] ?? null,
            $data['status'] ?? 'available'
        );
    }
}
