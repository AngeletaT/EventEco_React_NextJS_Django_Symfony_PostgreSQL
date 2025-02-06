<?php

namespace App\Organizer\Infrastructure\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Organizer\Domain\Entity\Organizer;
use App\Organizer\Infrastructure\Security\OrganizerSecurityAdapter;

class AuthenticationSuccessListener implements EventSubscriberInterface
{
    private EntityManagerInterface $entityManager;
    private RefreshTokenGenerator $refreshTokenGenerator;

    public function __construct(EntityManagerInterface $entityManager, RefreshTokenGenerator $refreshTokenGenerator)
    {
        $this->entityManager = $entityManager;
        $this->refreshTokenGenerator = $refreshTokenGenerator;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            'lexik_jwt_authentication.on_authentication_success' => 'onAuthenticationSuccessResponse',
        ];
    }

    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();
        $user = $event->getUser();

        // Si el usuario es un adaptador, obtenemos la entidad Organizer subyacente
        if ($user instanceof OrganizerSecurityAdapter) {
            $organizer = $user->getOrganizer();
        } elseif ($user instanceof Organizer) {
            $organizer = $user;
        } else {
            return;
        }

        // Generamos el refresh token con mayor TTL
        $refreshToken = $this->refreshTokenGenerator->generateToken($organizer);

        // Guardamos el refresh token en la entidad Organizer
        $organizer->setRefreshToken($refreshToken);
        $this->entityManager->flush();

        // Agregamos el refresh token a la respuesta de autenticación
        $data['refresh_token'] = $refreshToken;
        $event->setData($data);
    }
}