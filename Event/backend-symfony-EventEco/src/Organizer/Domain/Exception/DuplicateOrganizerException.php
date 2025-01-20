<?php

namespace App\Organizer\Domain\Exception;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class DuplicateOrganizerException extends BadRequestHttpException
{
    public function __construct(string $message = 'Duplicate organizer detected.', \Throwable $previous = null, int $code = 0)
    {
        parent::__construct($message, $previous, $code);
    }
}