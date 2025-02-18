<?php

namespace App\Complement\Presentation\Assembler\Response;

use App\Complement\Application\DTO\Response\GetComplementResponse;

class GetComplementsByEventSlugResponseAssembler
{
    /**
     * @param GetComplementResponse[] $responses
     * @return array
     */
    public static function toArray(array $responses): array
    {
        return array_map(function(GetComplementResponse $response) {
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
        }, $responses);
    }
}