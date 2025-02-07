<?php

namespace App\Organizer\Application\UseCase\Command\Logout;

use App\Organizer\Application\DTO\Response\LogoutOrganizerResponse;
use App\Organizer\Application\UseCase\InPort\LogoutOrganizerInterface;
use App\Organizer\Domain\OutPort\OrganizerRepositoryInterface;

class LogoutOrganizerService implements LogoutOrganizerInterface
{
    private OrganizerRepositoryInterface $organizerRepository;
    
    public function __construct(OrganizerRepositoryInterface $organizerRepository)
    {
        $this->organizerRepository = $organizerRepository;
    }
    
    /**
     * Ejecuta la lógica de logout: invalida el refresh token y persiste el cambio.
     *
     * @param int $organizerId
     * @return LogoutOrganizerResponse
     * @throws \Exception Si no se encuentra el organizer.
     */
    public function logout(int $organizerId): LogoutOrganizerResponse
    {
        $organizer = $this->organizerRepository->findById($organizerId);
        if (!$organizer) {
            throw new \Exception('Organizador no encontrado');
        }
        
        // Invalida el refresh token estableciéndolo a null.
        $organizer->setRefreshToken(null);
        
        // Persiste el cambio en la base de datos.
        // Se asume que el repositorio dispone de un método update() o similar.
        $this->organizerRepository->update($organizer);
        
        return new LogoutOrganizerResponse('Logout successful');
    }
}