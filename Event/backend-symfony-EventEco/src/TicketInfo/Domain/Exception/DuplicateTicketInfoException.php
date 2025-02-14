<?php

namespace App\TicketInfo\Domain\Exception;

use Exception;

class DuplicateTicketInfoException extends Exception
{
    public function __construct(
        string $message = "Ya existe un Ticket para este Evento con ese nombre.",
        int $code = 0,
        ?Exception $previous = null
    ) {
        parent::__construct($message, $code, $previous);
    }
}