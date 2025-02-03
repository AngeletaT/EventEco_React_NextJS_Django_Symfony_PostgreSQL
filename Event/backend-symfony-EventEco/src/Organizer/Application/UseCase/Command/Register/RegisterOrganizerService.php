<?php

namespace App\Organizer\Application\UseCase\Command\Register;

use App\Organizer\Application\DTO\Request\RegisterOrganizerRequest;
use App\Organizer\Application\DTO\Response\RegisterOrganizerResponse;
use App\Organizer\Presentation\Assembler\Response\RegisterOrganizerResponseAssembler;

class RegisterOrganizerService
{
    private RegisterOrganizerHandler $handler;
    private RegisterOrganizerResponseAssembler $responseAssembler;

    public function __construct(
        RegisterOrganizerHandler $handler,
        RegisterOrganizerResponseAssembler $responseAssembler
    ) {
        $this->handler = $handler;
        $this->responseAssembler = $responseAssembler;
    }

    public function execute(RegisterOrganizerRequest $request): RegisterOrganizerResponse
    {
        $command = new RegisterOrganizerCommand(
            $request->email,
            $request->password,
            $request->nif
        );

        $this->handler->handle($command);

        // Buscar el Organizer para armar la respuesta (esto podría optimizarse si ya tienes el Organizer)
        $organizer = $this->handler->getRepository()->findByEmail($request->email);

        return $this->responseAssembler->toHttpResponse($organizer);
    }
}