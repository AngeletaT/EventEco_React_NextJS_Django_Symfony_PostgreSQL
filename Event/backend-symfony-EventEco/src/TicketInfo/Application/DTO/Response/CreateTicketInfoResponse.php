<?php

namespace App\TicketInfo\Application\DTO\Response;

class CreateTicketInfoResponse
{
    private int $idTicketInfo;
    private string $eventSlug;
    private string $type;
    private float $price;
    private ?int $capacity;
    private ?int $remaining;
    private ?string $descripcion;
    private bool $isActive;

    public function __construct(
        int $idTicketInfo,
        string $eventSlug,
        string $type,
        float $price,
        ?int $capacity,
        ?int $remaining,
        ?string $descripcion,
        bool $isActive
    ) {
        $this->idTicketInfo = $idTicketInfo;
        $this->eventSlug = $eventSlug;
        $this->type = $type;
        $this->price = $price;
        $this->capacity = $capacity;
        $this->remaining = $remaining;
        $this->descripcion = $descripcion;
        $this->isActive = $isActive;
    }

    public function getIdTicketInfo(): int
    {
        return $this->idTicketInfo;
    }

    public function getEventSlug(): string
    {
        return $this->eventSlug;
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

    public function isActive(): bool
    {
        return $this->isActive;
    }
}