<?php

namespace App\Complement\Application\DTO\Request;

class UpdateComplementRequest
{
    private string $name;
    private ?string $description;
    private ?float $price;
    private ?string $imageUrl;
    /**
     * Opcional: permite actualizar el eventSlug, si es necesario.
     */
    private ?string $eventSlug;

    public function __construct(
        string $name,
        ?string $description,
        ?float $price,
        ?string $imageUrl,
        ?string $eventSlug = null
    ) {
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
        $this->imageUrl = $imageUrl;
        $this->eventSlug = $eventSlug;
    }

    public function getName(): string {
        return $this->name;
    }
    public function getDescription(): ?string {
        return $this->description;
    }
    public function getPrice(): ?float {
        return $this->price;
    }
    public function getImageUrl(): ?string {
        return $this->imageUrl;
    }
    public function getEventSlug(): ?string {
        return $this->eventSlug;
    }
}