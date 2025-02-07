<?php

namespace App\Organizer\Presentation\InAdapter\Providers;

use App\Organizer\Application\UseCase\Command\Logout\LogoutOrganizerCommand;
use App\Organizer\Application\UseCase\Command\Logout\LogoutOrganizerHandler;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LogoutOrganizerProvider extends AbstractController
{
    private LogoutOrganizerHandler $handler;

    public function __construct(LogoutOrganizerHandler $handler)
    {
        $this->handler = $handler;
    }

    /**
     * @Route("/organizers/logout", name="logout_organizer", methods={"POST"})
     *
     * Endpoint para cerrar la sesión del organizer.
     * En esta versión se decodifica el token manualmente para extraer el identificador,
     * ya que getUser() está devolviendo null.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function __invoke(Request $request): JsonResponse
    {
        try {
            // Extraer el token del header Authorization
            $authHeader = $request->headers->get('Authorization');
            if (!$authHeader || strpos($authHeader, 'Bearer ') !== 0) {
                return new JsonResponse(['error' => 'Token no proporcionado'], JsonResponse::HTTP_UNAUTHORIZED);
            }
            $accessToken = substr($authHeader, 7);

            // Obtener la clave pública desde los parámetros del contenedor
            $jwtPublicKey = $this->getParameter('organizer_jwt_public_key');
            // Si la clave viene en formato "file://...", leemos el contenido del archivo
            if (strpos($jwtPublicKey, 'file://') === 0) {
                $path = substr($jwtPublicKey, 7);
                $jwtPublicKey = file_get_contents($path);
            }

            // Decodificar el token usando la clave pública y el algoritmo RS256
            $decoded = JWT::decode($accessToken, new Key($jwtPublicKey, 'RS256'));

            // Verificar que el token tenga el identificador en 'username'
            $organizerId = $decoded->username ?? null;
            if (!$organizerId) {
                return new JsonResponse(['error' => 'Token inválido: falta identificador'], JsonResponse::HTTP_UNAUTHORIZED);
            }
            // Convertir a entero si es necesario (asumiendo que el id es numérico)
            $organizerId = (int) $organizerId;

            // Crear el comando y llamar al handler para ejecutar el logout
            $command = new LogoutOrganizerCommand($organizerId);
            $responseDTO = ($this->handler)($command);

            return new JsonResponse(
                ['message' => $responseDTO->getMessage()],
                JsonResponse::HTTP_OK
            );
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}