<?php

namespace App\Organizer\Application\UseCase\Command;

use App\Organizer\Application\DTO\Request\CreateOrganizerRequest;
use App\Organizer\Application\DTO\Response\CreateOrganizerResponse;
use App\Organizer\Presentation\Assembler\Response\CreateOrganizerResponseAssembler;

class CreateOrganizerService
{
    private CreateOrganizerHandler $handler;
    private CreateOrganizerResponseAssembler $responseAssembler;

    public function __construct(
        CreateOrganizerHandler $handler,
        CreateOrganizerResponseAssembler $responseAssembler
    ) {
        $this->handler = $handler;
        $this->responseAssembler = $responseAssembler;
    }

    public function execute(CreateOrganizerRequest $request): CreateOrganizerResponse
    {
        $command = new CreateOrganizerCommand(
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