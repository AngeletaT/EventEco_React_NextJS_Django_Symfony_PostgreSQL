<?php

namespace App\Complement\Presentation\Assembler\Request;

use App\Complement\Application\DTO\Request\UpdateComplementRequest;
use Symfony\Component\HttpFoundation\Request;

class UpdateComplementRequestAssembler
{
    public static function fromHttpRequest(Request $request): UpdateComplementRequest
    {
        $data = json_decode($request->getContent(), true);

        return new UpdateComplementRequest(
            $data['name'],
            $data['description'] ?? null,
            isset($data['price']) ? (float)$data['price'] : null,
            $data['imageUrl'] ?? null,
            $data['eventSlug'] ?? null
        );
    }
}