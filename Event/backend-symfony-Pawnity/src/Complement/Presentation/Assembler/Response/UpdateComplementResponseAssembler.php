<?php

namespace App\Complement\Presentation\Assembler\Response;

use App\Complement\Application\DTO\Response\UpdateComplementResponse;

class UpdateComplementResponseAssembler
{
    public static function toArray(UpdateComplementResponse $response): array
    {
        return [
            'idComplement' => $response->getIdComplement(),
            'name'         => $response->getName(),
            'description'  => $response->getDescription(),
            'price'        => $response->getPrice(),
            'imageUrl'     => $response->getImageUrl(),
            'eventSlug'    => $response->getEventSlug(),
            'isActive'     => $response->isActive(),
            'createdAt'    => $response->getCreatedAt()->format('Y-m-d H:i:s'),
            'updatedAt'    => $response->getUpdatedAt()->format('Y-m-d H:i:s'),
        ];
    }
}