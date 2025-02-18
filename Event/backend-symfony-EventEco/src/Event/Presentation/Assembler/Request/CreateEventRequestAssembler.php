<?php

declare(strict_types=1);

namespace App\Event\Presentation\Assembler\Request;

use App\Event\Application\DTO\Request\CreateEventRequest;
use Symfony\Component\HttpFoundation\Request;

class CreateEventRequestAssembler
{
    /**
     * Transforma la request HTTP en un DTO CreateEventRequest.
     *
     * Nota: No se recibe el idorg en el cuerpo; éste se asignará luego.
     *
     * @param Request $request
     * @return CreateEventRequest
     */
    public static function fromHttpRequest(Request $request): CreateEventRequest
    {
        $data = json_decode($request->getContent(), true) ?? [];
        
        // Procesar urlImage: convertir a array, ya que el DTO espera un ?array.
        $urlImage = $data['urlImage'] ?? null;
        if (is_string($urlImage)) {
            // Si es cadena, quitamos las llaves y separamos por comas.
            $trimmed = trim($urlImage, '{}');
            if ($trimmed === '') {
                $urlImage = [];
            } else {
                $urlImage = array_map('trim', explode(',', $trimmed));
            }
        } elseif (!is_array($urlImage)) {
            $urlImage = [];
        }
        
        return new CreateEventRequest(
            $data['name'] ?? '',
            new \DateTime($data['startDate'] ?? 'now'),
            new \DateTime($data['endDate'] ?? 'now'),
            $data['location'] ?? null,
            $data['position'] ?? null,
            $data['description'] ?? null,
            $data['status'] ?? 'Preparing',
            $urlImage, // Ahora se garantiza que es un array (o [] en caso de no haber dato)
            $data['urlPoster'] ?? null,
            $data['idCategory'] ?? null
        );
    }
}