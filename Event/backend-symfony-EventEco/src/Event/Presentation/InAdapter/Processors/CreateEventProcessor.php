<?php

declare(strict_types=1);

namespace App\Event\Presentation\InAdapter\Processors;

use App\Event\Application\UseCase\Command\CreateEvent\CreateEventCommand;
use App\Event\Application\UseCase\Command\CreateEvent\CreateEventCommandHandler;
use App\Event\Presentation\Assembler\Request\CreateEventRequestAssembler;
use App\Event\Presentation\Assembler\Response\CreateEventResponseAssembler;
use App\Event\Infrastructure\Security\JwtTokenExtractor;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CreateEventProcessor extends AbstractController
{
    private CreateEventCommandHandler $handler;
    private CreateEventRequestAssembler $assembler;
    private JwtTokenExtractor $tokenExtractor;

    public function __construct(
        CreateEventCommandHandler $handler,
        CreateEventRequestAssembler $assembler,
        JwtTokenExtractor $tokenExtractor
    ) {
        $this->handler = $handler;
        $this->assembler = $assembler;
        $this->tokenExtractor = $tokenExtractor;
    }

    /**
     * @Route("/organizer/event", name="create_event", methods={"POST"})
     */
    public function __invoke(Request $request): JsonResponse
    {
        try {
            // Extrae el header Authorization y obtiene el orgId mediante el servicio.
            $authorizationHeader = $request->headers->get('Authorization');
            if (!$authorizationHeader) {
                throw new \InvalidArgumentException('Token no proporcionado');
            }
            $orgId = $this->tokenExtractor->extractOrgIdFromToken($authorizationHeader);

            // Transforma el cuerpo de la request en un DTO CreateEventRequest.
            $createRequest = CreateEventRequestAssembler::fromHttpRequest($request);
            // Crea el comando con el DTO.
            $command = new CreateEventCommand($createRequest);
            // Procesa el comando delegando en el handler, pasando el orgId.
            $responseDTO = $this->handler->__invoke($command, $orgId);
            // Transforma el DTO de respuesta en un array para el JSON.
            $data = CreateEventResponseAssembler::toArray($responseDTO);
            return new JsonResponse($data, JsonResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}