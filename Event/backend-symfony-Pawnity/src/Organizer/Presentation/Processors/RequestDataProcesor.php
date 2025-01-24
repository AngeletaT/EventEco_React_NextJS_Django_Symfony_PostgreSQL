<?php

namespace App\Organizer\Presentation\Processor;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RequestDataProcessor
{
    public function process(array $data): array
    {
        // Normalizar el email
        if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new BadRequestHttpException('Invalid email format.');
        }
        $data['email'] = strtolower(trim($data['email']));

        // Normalizar el NIF
        if (!isset($data['nif']) || empty($data['nif'])) {
            throw new BadRequestHttpException('NIF is required.');
        }
        $data['nif'] = str_replace([' ', '-'], '', $data['nif']);

        return $data;
    }
}