<?php

namespace App\Organizer\Presentation\DTO\Request;

use Symfony\Component\Validator\Constraints as Assert;
/**
 * DTO for Create Organizer Request
 */
class CreateOrganizerRequest
{
    /**
     * @Assert\NotBlank(message="El campo 'email' es obligatorio.")
     * @Assert\Email(message="El campo 'email' debe tener un formato válido (ejemplo: text@text.com).")
     */
    public string $email;

    /**
     * @Assert\NotBlank(message="El campo 'password' es obligatorio.")
     * @Assert\Length(
     *     min=8,
     *     minMessage="El campo 'password' debe tener al menos 8 caracteres."
     * )
     */
    public string $password;

    /**
     * @Assert\NotBlank(message="El campo 'nif' es obligatorio.")
     * @Assert\Length(
     *     max=20,
     *     maxMessage="El campo 'nif' no puede tener más de 20 caracteres."
     * )
     */
    public string $nif;

    /**
     * Constructor
     */
    public function __construct(array $data)
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->{$key} = $value;
            }
        }
    }
}