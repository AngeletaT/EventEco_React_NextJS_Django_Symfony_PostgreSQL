<?php

namespace App\TicketInfo\Application\DTO\Response;

class GetTicketInfoResponse
{
    private int $idTicketInfo;
    private ?string $eventSlug;
    private string $type;
    private float $price;
    private ?int $capacity;
    private ?int $remaining;
    private ?string $descripcion;
    private bool $isActive;
    private \DateTime $createdAt;
    private \DateTime $updatedAt;

    public function __construct(
        int $idTicketInfo,
        ?string $eventSlug,
        string $type,
        float $price,
        ?int $capacity,
        ?int $remaining,
        ?string $descripcion,
        bool $isActive,
        \DateTime $createdAt,
        \DateTime $updatedAt
    ) {
        $this->idTicketInfo = $idTicketInfo;
        $this->eventSlug    = $eventSlug;
        $this->type         = $type;
        $this->price        = $price;
        $this->capacity     = $capacity;
        $this->remaining    = $remaining;
        $this->descripcion  = $descripcion;
        $this->isActive     = $isActive;
        $this->createdAt    = $createdAt;
        $this->updatedAt    = $updatedAt;
    }

    // Getters

    public function getIdTicketInfo(): int
    {
        return $this->idTicketInfo;
    }

    public function getEventSlug(): ?string
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

    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): \DateTime
    {
        return $this->updatedAt;
    }
}