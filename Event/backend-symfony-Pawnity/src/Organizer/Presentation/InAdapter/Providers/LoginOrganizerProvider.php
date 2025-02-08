<?php

namespace App\Organizer\Presentation\InAdapter\Providers;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Organizer\Presentation\Assembler\Request\LoginOrganizerRequestAssembler;
use App\Organizer\Application\UseCase\InPort\LoginOrganizerInterface;
use App\Organizer\Presentation\Assembler\Response\LoginOrganizerResponseAssembler;
use App\Organizer\Domain\Exception\InvalidCredentialsException;

class LoginOrganizerProvider extends AbstractController
{
    private LoginOrganizerInterface $loginOrganizerService;

    public function __construct(LoginOrganizerInterface $loginOrganizerService)
    {
        $this->loginOrganizerService = $loginOrganizerService;
    }

    /**
     * @Route("/organizer/login", name="organizer_login", methods={"POST"})
     */
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        try {
            // Transformamos el request en un comando usando el assembler
            $command = LoginOrganizerRequestAssembler::assemble($data);

            // Ejecutamos el caso de uso de login a través del Port In
            $responseDTO = $this->loginOrganizerService->login($command);

            // Convertimos el DTO de respuesta en un array para la salida
            $response = LoginOrganizerResponseAssembler::assemble($responseDTO);

            return new JsonResponse($response, JsonResponse::HTTP_OK);
        } catch (InvalidCredentialsException $e) {
            return new JsonResponse(['message' => $e->getMessage()], JsonResponse::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}