<?php

namespace App\Organizer\Presentation\Assembler\Request;

use App\Organizer\Application\DTO\Request\CreateOrganizerRequest;
use Symfony\Component\HttpFoundation\Request;

class CreateOrganizerRequestAssembler
{
    public function fromHttpRequest(Request $request): CreateOrganizerRequest
    {
        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            throw new \InvalidArgumentException('Invalid request payload. Expected JSON object.');
        }

        return new CreateOrganizerRequest($data);
    }
}