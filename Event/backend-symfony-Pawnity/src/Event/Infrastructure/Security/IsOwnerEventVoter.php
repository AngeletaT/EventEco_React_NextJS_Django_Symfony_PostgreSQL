<?php

declare(strict_types=1);

namespace App\Event\Infrastructure\Security;

use App\Event\Domain\Entity\Event;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class IsOwnerEventVoter extends Voter
{
    public const EDIT = 'EDIT_EVENT';

    protected function supports(string $attribute, $subject): bool
    {
        // Este voter solo se activa para el atributo EDIT_EVENT y cuando el sujeto es un objeto Event.
        return $attribute === self::EDIT && $subject instanceof Event;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        // Si el usuario no está autenticado, denegamos el acceso.
        $user = $token->getUser();
        if (!$user) {
            return false;
        }
        
        // Suponiendo que getUserIdentifier() devuelve el ID del organizer como string
        $organizerId = (int)$user->getUserIdentifier();
    
        // Sólo se permite la edición si el ID del organizer en el evento coincide con el del usuario.
        return $subject->getOrgId() === $organizerId;
    }
}