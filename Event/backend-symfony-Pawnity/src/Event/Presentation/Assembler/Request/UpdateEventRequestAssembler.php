<?php

declare(strict_types=1);

namespace App\Event\Presentation\Assembler\Request;

use App\Event\Application\DTO\Request\UpdateEventRequest;
use Symfony\Component\HttpFoundation\Request;

class UpdateEventRequestAssembler
{
    public static function fromHttpRequest(Request $request): UpdateEventRequest
    {
        $data = json_decode($request->getContent(), true) ?? [];

        // Procesar urlImage:
        $urlImage = $data['urlImage'] ?? null;
        if (is_array($urlImage)) {
            // Se deja tal cual.
        } elseif (is_string($urlImage)) {
            // Si viene como literal de array, quitamos las llaves y convertimos a array.
            $trimmed = trim($urlImage, '{}');
            $urlImage = $trimmed === '' ? [] : array_map('trim', explode(',', $trimmed));
        } else {
            $urlImage = null;
        }

        return new UpdateEventRequest(
            $data['name'] ?? null,
            isset($data['startDate']) ? new \DateTime($data['startDate']) : null,
            isset($data['endDate']) ? new \DateTime($data['endDate']) : null,
            $data['location'] ?? null,
            $data['description'] ?? null,
            $data['status'] ?? null,
            $urlImage,
            $data['urlPoster'] ?? null,
            $data['idCategory'] ?? null
        );
    }
}