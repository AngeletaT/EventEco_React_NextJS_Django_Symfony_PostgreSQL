<?php

namespace App\Organizer\Application\DTO\Response;

class LogoutOrganizerResponse
{
    private string $message;

    public function __construct(string $message)
    {
        $this->message = $message;
    }

    public function getMessage(): string
    {
        return $this->message;
    }
}