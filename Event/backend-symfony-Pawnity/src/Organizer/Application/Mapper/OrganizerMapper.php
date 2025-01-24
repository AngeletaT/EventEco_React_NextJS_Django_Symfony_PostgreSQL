<?php

namespace App\Organizer\Application\Mapper;

use App\Organizer\Domain\Entity\Organizer;
use App\Organizer\Presentation\DTO\Request\CreateOrganizerRequest;
use App\Organizer\Presentation\DTO\Response\CreateOrganizerResponse;
use App\Shared\Mapper\MapperInterface;
use Symfony\Component\Uid\Uuid;

class OrganizerMapper implements MapperInterface
{
    /**
     * @inheritDoc
     */
    public static function fromRequest(array $input): Organizer
    {
        return new Organizer(
            Uuid::v4(),
            $input['email'],
            $input['password'],
            $input['nif']
        );
    }

    /**
     * @inheritDoc
     */
    public static function toResponse($organizer): array
    {
        return [
            'idOrg' => $organizer->getIdOrg(),
            'uuid' => $organizer->getUuid(),
            'email' => $organizer->getEmail(),
            'nif' => $organizer->getNif(),
            'isActive' => $organizer->isActive(),
            'createdAt' => $organizer->getCreatedAt()->format('Y-m-d H:i:s'),
            'updatedAt' => $organizer->getUpdatedAt()->format('Y-m-d H:i:s'),
        ];
    }
}