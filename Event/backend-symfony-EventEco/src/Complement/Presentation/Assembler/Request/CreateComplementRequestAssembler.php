<?php

namespace App\Complement\Presentation\Assembler\Request;

use App\Complement\Application\DTO\Request\CreateComplementRequest;
use Symfony\Component\HttpFoundation\Request;

class CreateComplementRequestAssembler
{
    public static function fromHttpRequest(Request $request): CreateComplementRequest
    {
        $data = json_decode($request->getContent(), true);
        return new CreateComplementRequest(
            $data['name'],
            $data['description'] ?? null,
            isset($data['price']) ? (float)$data['price'] : null,
            $data['imageUrl'] ?? null
        );
    }
}