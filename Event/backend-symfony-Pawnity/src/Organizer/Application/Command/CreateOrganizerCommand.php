<?php

namespace App\Organizer\Application\Command;

use Symfony\Component\PropertyAccess\PropertyAccess;

/**
 * Command to handle the creation of an Organizer.
 */

class CreateOrganizerCommand
{
    private array $data;

    public function __construct(
        string $email,
        string $password,
        string $nif
    ) {
        $this->data = [
            'email' => $email,
            'password' => $password,
            'nif' => $nif
        ];
    }

    public function __call(string $method, array $arguments)
    {
        if (str_starts_with($method, 'get')) {
            $property = lcfirst(substr($method, 3)); // Convierte "getName" a "name"
            $propertyAccessor = PropertyAccess::createPropertyAccessor();
            return $propertyAccessor->getValue($this->data, "[$property]");
        }

        throw new \BadMethodCallException("Method $method does not exist.");
    }
}