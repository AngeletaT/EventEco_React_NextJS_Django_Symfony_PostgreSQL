<?php

namespace App\Complement\Application\DTO\Request;

class CreateComplementRequest
{
    private string $name;
    private ?string $description;
    private ?float $price;
    private ?string $imageUrl;

    public function __construct(
        string $name,
        ?string $description,
        ?float $price,
        ?string $imageUrl
    ) {
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
        $this->imageUrl = $imageUrl;
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
}