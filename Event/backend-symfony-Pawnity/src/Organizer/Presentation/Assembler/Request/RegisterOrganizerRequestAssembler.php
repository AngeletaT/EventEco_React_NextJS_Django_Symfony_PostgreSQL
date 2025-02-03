<?php

namespace App\Organizer\Presentation\Assembler\Request;

use App\Organizer\Application\DTO\Request\RegisterOrganizerRequest;
use Symfony\Component\HttpFoundation\Request;

class RegisterOrganizerRequestAssembler
{
    public function fromHttpRequest(Request $request): RegisterOrganizerRequest
    {
        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            throw new \InvalidArgumentException('Invalid request payload. Expected JSON object.');
        }

        return new RegisterOrganizerRequest($data);
    }
}