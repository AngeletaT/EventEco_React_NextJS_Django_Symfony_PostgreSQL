<?php
// src/Pet/Application/DTO/Response/CreatePetResponse.php
namespace App\Pet\Application\DTO\Response;

class CreatePetResponse
{
    private string $uuid;
    private string $message;

    public function __construct(string $uuid, string $message)
    {
        $this->uuid = $uuid;
        $this->message = $message;
    }

    public function getUuid(): string
    {
        return $this->uuid;
    }

    public function getMessage(): string
    {
        return $this->message;
    }
}
