<?php

namespace App\Organizer\Application\DTO\Response;

use JsonSerializable;

class CreateOrganizerResponse implements JsonSerializable
{
    private array $data;

    public function __construct(
        int $idOrg,
        string $uuid,
        string $email,
        string $nif,
        bool $isActive,
        string $createdAt,
        string $updatedAt
    ) {
        $this->data = [
            'idOrg' => $idOrg,
            'uuid' => $uuid,
            'email' => $email,
            'nif' => $nif,
            'isActive' => $isActive,
            'createdAt' => $createdAt,
            'updatedAt' => $updatedAt,
        ];
    }

    public function jsonSerialize(): array
    {
        return $this->data;
    }
}