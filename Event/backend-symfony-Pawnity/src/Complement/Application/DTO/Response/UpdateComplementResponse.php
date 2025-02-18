<?php

namespace App\Complement\Application\DTO\Response;

class UpdateComplementResponse
{
    private int $idComplement;
    private string $name;
    private ?string $description;
    private ?float $price;
    private ?string $imageUrl;
    private string $eventSlug;
    private bool $isActive;
    private \DateTime $createdAt;
    private \DateTime $updatedAt;

    public function __construct(
        int $idComplement,
        string $name,
        ?string $description,
        ?float $price,
        ?string $imageUrl,
        string $eventSlug,
        bool $isActive,
        \DateTime $createdAt,
        \DateTime $updatedAt
    ) {
        $this->idComplement = $idComplement;
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
        $this->imageUrl = $imageUrl;
        $this->eventSlug = $eventSlug;
        $this->isActive = $isActive;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
    }

    public function getIdComplement(): int { return $this->idComplement; }
    public function getName(): string { return $this->name; }
    public function getDescription(): ?string { return $this->description; }
    public function getPrice(): ?float { return $this->price; }
    public function getImageUrl(): ?string { return $this->imageUrl; }
    public function getEventSlug(): string { return $this->eventSlug; }
    public function isActive(): bool { return $this->isActive; }
    public function getCreatedAt(): \DateTime { return $this->createdAt; }
    public function getUpdatedAt(): \DateTime { return $this->updatedAt; }
}