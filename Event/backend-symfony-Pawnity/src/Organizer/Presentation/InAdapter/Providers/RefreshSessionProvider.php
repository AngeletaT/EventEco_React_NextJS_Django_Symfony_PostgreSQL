<?php

namespace App\Organizer\Presentation\InAdapter\Providers;

use App\Organizer\Application\UseCase\Command\RefreshSession\RefreshSessionCommand;
use App\Organizer\Application\UseCase\Command\RefreshSession\RefreshSessionHandler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class RefreshSessionProvider extends AbstractController
{
    private RefreshSessionHandler $handler;

    public function __construct(RefreshSessionHandler $handler)
    {
        $this->handler = $handler;
    }
    /**
     * @Route("/organizer/current_user", name="refresh_session", methods={"GET", "POST"})
     */
    public function __invoke(Request $request): JsonResponse
    {
        // Extraer el token del header Authorization
        $authHeader = $request->headers->get('Authorization');
        if (!$authHeader || strpos($authHeader, 'Bearer ') !== 0) {
            return new JsonResponse(['error' => 'Token no proporcionado'], JsonResponse::HTTP_UNAUTHORIZED);
        }
        $accessToken = substr($authHeader, 7);

        try {
            // Crear el comando a partir del token recibido
            $command = new RefreshSessionCommand($accessToken);

            // Ejecutar el caso de uso mediante el handler
            $responseDTO = ($this->handler)($command);

            // Preparar la respuesta (datos del organizer sin exponer el refresh token)
            $data = [
                'organizer'    => $responseDTO->getOrganizer(),
                'accesstoken' => $responseDTO->getAccessToken(),
            ];

            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            // En caso de error, se retorna un código 401 o el que corresponda según la excepción
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_UNAUTHORIZED);
        }
    }
}