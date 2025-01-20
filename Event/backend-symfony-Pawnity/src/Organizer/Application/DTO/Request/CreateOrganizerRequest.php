<?php

namespace App\Organizer\Application\DTO\Request;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * DTO for Create Organizer Request
 */
class CreateOrganizerRequest
{
    /**
     * @Assert\NotBlank(message="El campo 'name' es obligatorio.")
     * @Assert\Length(max=100, maxMessage="El campo 'name' no puede tener más de 100 caracteres.")
     */
    public string $name;

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
     * @Assert\Length(
     *     max=200,
     *     maxMessage="El campo 'address' no puede tener más de 200 caracteres."
     * )
     */
    public ?string $address = null;

    /**
     * @Assert\Url(message="El campo 'urlLogo' debe tener un formato de URL válido.")
     */
    public ?string $urlLogo = null;

    /**
     * @Assert\Length(
     *     max=255,
     *     maxMessage="El campo 'description' no puede tener más de 255 caracteres."
     * )
     */
    public ?string $description = null;

    /**
     * @Assert\Url(message="El campo 'urlWeb' debe tener un formato de URL válido.")
     */
    public ?string $urlWeb = null;

    /**
     * @Assert\Url(message="El campo 'urlImage' debe tener un formato de URL válido.")
     */
    public ?string $urlImage = null;

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