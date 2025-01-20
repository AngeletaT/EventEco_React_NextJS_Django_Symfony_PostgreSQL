<?php

namespace App\Shared\Exception;

use App\Organizer\Domain\Exception\DuplicateOrganizerException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class GlobalExceptionHandler
{
    public function handleDuplicateOrganizerException(DuplicateOrganizerException $exception): JsonResponse
    {
        return new JsonResponse([
            'error' => $exception->getMessage()
        ], JsonResponse::HTTP_BAD_REQUEST);
    }
}