<?php

namespace App\Shared\Exception;

use App\Organizer\Domain\Exception\DuplicateOrganizerException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class GlobalExceptionHandler
{
   // Listener
    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        // Manejo específico para DuplicateOrganizerException
        if ($exception instanceof DuplicateOrganizerException) {
            $response = new JsonResponse(
                ['error' => $exception->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST // Código 400
            );
            $event->setResponse($response);
            return;
        }

        // Manejo genérico para otras excepciones
        $statusCode = $exception instanceof HttpExceptionInterface
            ? $exception->getStatusCode()
            : JsonResponse::HTTP_INTERNAL_SERVER_ERROR;

        $response = new JsonResponse(
            [
                'error' => $exception->getMessage()
            ],
            $statusCode
        );
        $event->setResponse($response);
    }
}