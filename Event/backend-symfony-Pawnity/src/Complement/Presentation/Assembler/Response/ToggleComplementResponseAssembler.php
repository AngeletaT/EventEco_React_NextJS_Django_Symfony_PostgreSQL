<?php

namespace App\Complement\Presentation\Assembler\Response;

use App\Complement\Application\DTO\Response\ToggleComplementResponse;

class ToggleComplementResponseAssembler
{
    public static function toArray(ToggleComplementResponse $response): array
    {
        return [
            'idComplement' => $response->getIdComplement(),
            'isActive'     => $response->isActive(),
        ];
    }
}