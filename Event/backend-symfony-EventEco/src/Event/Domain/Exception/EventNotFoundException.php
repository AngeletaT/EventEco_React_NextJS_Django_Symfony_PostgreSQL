<?php

namespace App\Event\Domain\Exception;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EventNotFoundException extends NotFoundHttpException
{
    public function __construct(string $message = 'Event not found.', ?\Throwable $previous = null, int $code = 0)
    {
        parent::__construct($message, $previous, $code);
    }
}