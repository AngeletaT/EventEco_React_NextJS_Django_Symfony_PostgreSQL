<?php

namespace App\Organizer\Presentation\Assembler\Response;

use App\Organizer\Application\DTO\Response\CreateOrganizerResponse;
use App\Organizer\Domain\Entity\Organizer;

class CreateOrganizerResponseAssembler
{
    public function toHttpResponse(Organizer $organizer): CreateOrganizerResponse
    {
        return new CreateOrganizerResponse(
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