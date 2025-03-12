<?php

declare(strict_types=1);

namespace App\Event\Presentation\Assembler\Request;

use App\Event\Application\DTO\Request\CreateEventRequest;
use Symfony\Component\HttpFoundation\Request;
use InvalidArgumentException;

class CreateEventRequestAssembler
{
    /**
     * Transforma la request HTTP en un DTO CreateEventRequest.
     *
     * Nota: No se recibe el idorg en el cuerpo; éste se asignará luego.
     *
     * @param Request $request
     * @return CreateEventRequest
     * @throws InvalidArgumentException si las fechas requeridas no están presentes o tienen formato incorrecto
     */
    public static function fromHttpRequest(Request $request): CreateEventRequest
    {
        $data = json_decode($request->getContent(), true) ?? [];
        
        // Validar y convertir fechas
        $startDate = self::validateAndParseDate($data, 'startDate');
        $endDate = self::validateAndParseDate($data, 'endDate');
        
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
            $startDate,
            $endDate,
            $data['location'] ?? null,
            $data['position'] ?? null,
            $data['description'] ?? null,
            $data['status'] ?? 'Preparing',
            $urlImage, // Ahora se garantiza que es un array (o [] en caso de no haber dato)
            $data['urlPoster'] ?? null,
            $data['idCategory'] ?? null
        );
    }
    
    /**
     * Valida y convierte una fecha de string a objeto DateTime
     * 
     * @param array $data Array de datos
     * @param string $field Nombre del campo fecha
     * @return \DateTime
     * @throws InvalidArgumentException si la fecha no está presente o es inválida
     */
    private static function validateAndParseDate(array $data, string $field): \DateTime
    {
        if (!isset($data[$field]) || empty($data[$field])) {
            throw new InvalidArgumentException("El campo $field es obligatorio");
        }
        
        try {
            return new \DateTime($data[$field]);
        } catch (\Exception $e) {
            throw new InvalidArgumentException("El formato del campo $field es incorrecto");
        }
    }
}