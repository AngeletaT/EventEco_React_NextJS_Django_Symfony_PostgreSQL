<?php

namespace App\Organizer\Infrastructure\Middleware;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class IsOrganizer implements EventSubscriberInterface
{
    private string $publicKey;

    public function __construct(string $publicKey)
    {
        $this->publicKey = $publicKey;
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();
        $path = $request->getPathInfo();
        // dump('Middleware IsOrganizer ejecutado');

        // Solo se protege si la ruta comienza con "/p_symfony/api/organizer"
        if (strpos($path, '/p_symfony/api/organizer') !== 0) {
            return;
        }

        // Definir las rutas públicas que NO requieren token (con el prefijo completo)
        $publicRoutes = [
            '/p_symfony/api/organizer/login',
            '/p_symfony/api/organizer/register',
        ];

        // Si la ruta es pública, se salta la validación
        if (in_array($path, $publicRoutes, true)) {
            return;
        }

        // Para las rutas protegidas, se procede a validar el token.
        $authorizationHeader = $request->headers->get('Authorization');
        if (!$authorizationHeader) {
            $event->setResponse(new JsonResponse(
                ['error' => 'Token no proporcionado'],
                Response::HTTP_UNAUTHORIZED
            ));
            return;
        }

        // Extraer el token eliminando el prefijo "Bearer " si existe.
        if (strpos($authorizationHeader, 'Bearer ') === 0) {
            $token = substr($authorizationHeader, 7);
        } else {
            $token = $authorizationHeader;
        }

        try {
            // Decodificar el token utilizando la clave pública y el algoritmo RS256.
            $decoded = JWT::decode($token, new Key($this->publicKey, 'RS256'));
            $decodedArray = (array)$decoded;

            // Se espera que el token tenga un claim "roles" que sea un array o convertible a array.
            $roles = isset($decodedArray['roles']) ? (array)$decodedArray['roles'] : [];

            // Si el rol "ROLE_ORGANIZER" no está presente, se deniega el acceso.
            if (!in_array('ROLE_ORGANIZER', $roles, true)) {
                $event->setResponse(new JsonResponse(
                    ['error' => 'No autorizado'],
                    Response::HTTP_FORBIDDEN
                ));
                return;
            }
        } catch (\Exception $e) {
            $event->setResponse(new JsonResponse(
                ['error' => 'Token inválido: ' . $e->getMessage()],
                Response::HTTP_UNAUTHORIZED
            ));
            return;
        }
    }

    public static function getSubscribedEvents(): array
    {
        return [
            // Se suscribe al evento kernel.request para ejecutarse lo antes posible.
            RequestEvent::class => 'onKernelRequest',
        ];
    }
}