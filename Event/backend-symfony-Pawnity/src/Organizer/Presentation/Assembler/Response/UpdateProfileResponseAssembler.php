<?php

declare(strict_types=1);

namespace App\Organizer\Presentation\Assembler\Response;

use App\Organizer\Application\DTO\Response\UpdateProfileResponse;
use DateTimeInterface;

class UpdateProfileResponseAssembler
{
    public static function toArray(UpdateProfileResponse $response): array
    {
        return [
            'idProfileOrg' => $response->getIdProfileOrg(),
            'idOrg'        => $response->getIdOrg(),
            'name'         => $response->getName(),
            'address'      => $response->getAddress(),
            'urlLogo'      => $response->getUrlLogo(),
            'description'  => $response->getDescription(),
            'urlWeb'       => $response->getUrlWeb(),
            'urlImage'     => $response->getUrlImage(),
            'createdAt'    => $response->getCreatedAt()->format(DateTimeInterface::ATOM),
            'updatedAt'    => $response->getUpdatedAt()->format(DateTimeInterface::ATOM),
        ];
    }
}