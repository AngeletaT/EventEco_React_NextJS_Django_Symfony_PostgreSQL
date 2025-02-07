<?php

declare(strict_types=1);

namespace App\Organizer\Domain\Exception;

use Exception;

class ProfileNotFoundException extends Exception
{
    // Puedes personalizar el constructor si lo deseas.
    public function __construct(string $message = "Profile no encontrado.", int $code = 0, ?Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}