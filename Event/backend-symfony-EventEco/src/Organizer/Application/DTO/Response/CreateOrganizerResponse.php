<?php

namespace App\Organizer\Application\DTO\Response;

use Symfony\Component\PropertyAccess\PropertyAccess;
use JsonSerializable;

/**
 * DTO for Create Organizer Response
 */
/**
     * Constructor
     *
     * @param string $idOrg
     * @param string $uuid
     * @param string $email
     * @param string $nif
     * @param bool $isActive
     * @param string $createdAt
     * @param string $updatedAt
     */
class CreateOrganizerResponse implements JsonSerializable
{
    private array $data;

    public function __construct(
        string $idOrg,
        string $uuid,
        string $email,
        string $nif,
        bool $isActive = true,
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

    /**
     * Magic method to dynamically get properties.
     */
    public function __call(string $method, array $arguments)
    {
        if (str_starts_with($method, 'get')) {
            $property = lcfirst(substr($method, 3)); // Convert "getName" to "name"
            $propertyAccessor = PropertyAccess::createPropertyAccessor();

            if (array_key_exists($property, $this->data)) {
                return $propertyAccessor->getValue($this->data, "[$property]");
            }
        } elseif ($method === 'isActive') {
            return $this->data['isActive'] ?? null;
        }

        throw new \BadMethodCallException("Method $method does not exist.");
    }

    /**
     * Implement JsonSerializable to expose data.
     */
    public function jsonSerialize(): array
    {
        return $this->data;
    }
}