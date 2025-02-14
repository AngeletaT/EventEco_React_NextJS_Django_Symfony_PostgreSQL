<?php

namespace App\TicketInfo\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "p_ticketinfo")]
class TicketInfo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "idticketinfo", type: "integer")]
    private ?int $idTicketInfo = null;

    #[ORM\Column(name: "eventslug", type: "string", length: 100, nullable: true)]
    private ?string $eventSlug = null;

    #[ORM\Column(type: "string", length: 50)]
    private string $type;

    #[ORM\Column(type: "decimal", precision: 10, scale: 2)]
    private float $price;

    #[ORM\Column(type: "integer", nullable: true)]
    private ?int $capacity = null;

    #[ORM\Column(type: "integer", nullable: true)]
    private ?int $remaining = null;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    private ?string $descripcion = null;

    #[ORM\Column(name: "isactive", type: "boolean", options: ["default" => true])]
    private bool $isActive = true;

    #[ORM\Column(name: "createdat", type: "datetime")]
    private \DateTime $createdAt;

    #[ORM\Column(name: "updatedat", type: "datetime")]
    private \DateTime $updatedAt;

    public function __construct()
    {
        $this->isActive  = true;
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    // Getters y Setters

    public function getIdTicketInfo(): ?int
    {
        return $this->idTicketInfo;
    }

    public function getEventSlug(): ?string
    {
        return $this->eventSlug;
    }

    public function setEventSlug(?string $eventSlug): self
    {
        $this->eventSlug = $eventSlug;
        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;
        return $this;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(?int $capacity): self
    {
        $this->capacity = $capacity;
        return $this;
    }

    public function getRemaining(): ?int
    {
        return $this->remaining;
    }

    public function setRemaining(?int $remaining): self
    {
        $this->remaining = $remaining;
        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(?string $descripcion): self
    {
        $this->descripcion = $descripcion;
        return $this;
    }

    public function getIsActive(): bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;
        return $this;
    }

    public function disable(): self
    {
        $this->isActive = false;
        return $this;
    }

    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): \DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTime $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }
}