<?php

namespace App\TicketInfo\Domain\Exception;

use Exception;

class TicketInfoNotFoundException extends Exception
{
    public function __construct(
        string $message = "TicketInfo no encontrado.",
        int $code = 0,
        ?Exception $previous = null
    ) {
        parent::__construct($message, $code, $previous);
    }
}