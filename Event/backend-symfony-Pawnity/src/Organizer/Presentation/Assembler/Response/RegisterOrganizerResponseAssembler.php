<?php

namespace App\Organizer\Presentation\Assembler\Response;

use App\Organizer\Application\DTO\Response\RegisterOrganizerResponse;
use App\Organizer\Domain\Entity\Organizer;

class RegisterOrganizerResponseAssembler
{
    public function toHttpResponse(Organizer $organizer): RegisterOrganizerResponse
    {
        return new RegisterOrganizerResponse(
            idOrg: (string) $organizer->getIdOrg(),
            uuid: $organizer->getUuid(),
            email: $organizer->getEmail(),
            nif: $organizer->getNif(),
            isActive: $organizer->isActive(),
            createdAt: $organizer->getCreatedAt()->format('Y-m-d H:i:s'),
            updatedAt: $organizer->getUpdatedAt()->format('Y-m-d H:i:s')
        );
    }
}