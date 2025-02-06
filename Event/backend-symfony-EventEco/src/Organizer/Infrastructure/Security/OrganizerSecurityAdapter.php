<?php

namespace App\Organizer\Infrastructure\Security;

use App\Organizer\Domain\Entity\Organizer;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

class OrganizerSecurityAdapter implements UserInterface, PasswordAuthenticatedUserInterface
{
    private Organizer $organizer;

    public function __construct(Organizer $organizer)
    {
        $this->organizer = $organizer;
    }

    public function getUserIdentifier(): string
    {
        return $this->organizer->getEmail();
    }

    public function getPassword(): string
    {
        return $this->organizer->getPassword();
    }

    public function getRoles(): array
    {
        // Por ejemplo, devolvemos un rol por defecto.
        return ['ROLE_ORGANIZER'];
    }

    public function eraseCredentials(): void
    {
        // Si se almacenan datos sensibles temporalmente, límpialos aquí.
    }

    // Puedes agregar un getter para acceder a la entidad si es necesario.
    public function getOrganizer(): Organizer
    {
        return $this->organizer;
    }
}