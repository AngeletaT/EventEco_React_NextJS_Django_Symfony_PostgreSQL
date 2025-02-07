<?php

declare(strict_types=1);

namespace App\Organizer\Presentation\Assembler\Response;

use App\Organizer\Application\DTO\Response\ProfileResponse;
use DateTimeInterface;

class ProfileResponseAssembler
{
    /**
     * Transforma un DTO ProfileResponse en un array asociativo para la respuesta HTTP.
     *
     * @param ProfileResponse $profileResponse
     * @return array
     */
    public static function toArray(ProfileResponse $profileResponse): array
    {
        return [
            'idProfileOrg' => $profileResponse->getIdProfileOrg(),
            'idOrg'        => $profileResponse->getIdOrg(),
            'name'         => $profileResponse->getName(),
            'address'      => $profileResponse->getAddress(),
            'urlLogo'      => $profileResponse->getUrlLogo(),
            'description'  => $profileResponse->getDescription(),
            'urlWeb'       => $profileResponse->getUrlWeb(),
            'urlImage'     => $profileResponse->getUrlImage(),
            'createdAt'    => $profileResponse->getCreatedAt()->format(DateTimeInterface::ATOM),
            'updatedAt'    => $profileResponse->getUpdatedAt()->format(DateTimeInterface::ATOM),
        ];
    }
}