<?php

namespace App\TicketInfo\Application\DTO\Request;

class CreateTicketInfoRequest
{
    private string $type;
    private float $price;
    private ?int $capacity;
    private ?int $remaining;
    private ?string $descripcion;

    public function __construct(
        string $type,
        float $price,
        ?int $capacity,
        ?int $remaining,
        ?string $descripcion
    ) {
        $this->type = $type;
        $this->price = $price;
        $this->capacity = $capacity;
        $this->remaining = $remaining;
        $this->descripcion = $descripcion;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function getRemaining(): ?int
    {
        return $this->remaining;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }
}