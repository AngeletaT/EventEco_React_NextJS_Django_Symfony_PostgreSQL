<?php

namespace App\Organizer\Presentation\Assembler\Request;

use App\Organizer\Application\UseCase\Command\Login\LoginOrganizerCommand;

class LoginOrganizerRequestAssembler
{
    /**
     * Transforma un array de datos (por ejemplo, JSON decodificado) en un objeto LoginOrganizerCommand.
     *
     * @param array $data
     * @return LoginOrganizerCommand
     * @throws \InvalidArgumentException Si faltan datos requeridos.
     */
    public static function assemble(array $data): LoginOrganizerCommand
    {
        if (!isset($data['email']) || !isset($data['password'])) {
            throw new \InvalidArgumentException('Faltan datos requeridos: email y/o password.');
        }
        
        return new LoginOrganizerCommand($data['email'], $data['password']);
    }
}