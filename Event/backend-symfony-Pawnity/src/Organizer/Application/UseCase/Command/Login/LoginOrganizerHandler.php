<?php

namespace App\Organizer\Application\UseCase\Command\Login;

use App\Organizer\Application\DTO\Response\LoginOrganizerResponse;
use App\Organizer\Domain\OutPort\OrganizerRepositoryInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use App\Organizer\Infrastructure\Security\RefreshTokenGenerator;
use App\Organizer\Domain\Exception\InvalidCredentialsException;
use App\Organizer\Infrastructure\Security\OrganizerSecurityAdapter;

class LoginOrganizerHandler
{
    private OrganizerRepositoryInterface $organizerRepository;
    private UserPasswordHasherInterface $passwordHasher;
    private JWTTokenManagerInterface $jwtTokenManager;
    private RefreshTokenGenerator $refreshTokenGenerator;

    public function __construct(
        OrganizerRepositoryInterface $organizerRepository,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $jwtTokenManager,
        RefreshTokenGenerator $refreshTokenGenerator
    ) {
        $this->organizerRepository  = $organizerRepository;
        $this->passwordHasher       = $passwordHasher;
        $this->jwtTokenManager      = $jwtTokenManager;
        $this->refreshTokenGenerator = $refreshTokenGenerator;
    }

    public function __invoke(LoginOrganizerCommand $command): LoginOrganizerResponse
    {
        // Se busca al Organizer por email
        $organizer = $this->organizerRepository->findByEmail($command->getEmail());
        if (!$organizer) {
            throw new InvalidCredentialsException('Email inválido');
        }

        // Se verifica la contraseña
        if (!$this->passwordHasher->isPasswordValid($organizer, $command->getPassword())) {
            throw new InvalidCredentialsException('Password incorrecta');
        }

        // Se crea el adaptador para que la entidad cumpla con UserInterface
        $securityAdapter = new OrganizerSecurityAdapter($organizer);

        // Se genera el access token utilizando el adaptador
        $accessToken = $this->jwtTokenManager->create($securityAdapter);

        // Se genera el refresh token (JWT con mayor TTL) y se actualiza el Organizer
        $refreshToken = $this->refreshTokenGenerator->generateToken($organizer);
        $organizer->setRefreshToken($refreshToken);

        // Se persiste el cambio
        $this->organizerRepository->save($organizer);

        return new LoginOrganizerResponse($accessToken, $refreshToken);
    }
}