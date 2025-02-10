<?php

declare(strict_types=1);

namespace App\Event\Application\DTO\Request;

class CreateEventRequest
{
    private string $name;
    private \DateTimeInterface $startDate;
    private \DateTimeInterface $endDate;
    private ?string $location;
    private ?string $description;
    private string $status;
    private ?array $urlImage;
    private ?string $urlPoster;
    private ?int $idCategory;

    public function __construct(
        string $name,
        \DateTimeInterface $startDate,
        \DateTimeInterface $endDate,
        ?string $location,
        ?string $description,
        string $status,
        ?array $urlImage,
        ?string $urlPoster,
        ?int $idCategory
    ) {
        $this->name = $name;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->location = $location;
        $this->description = $description;
        $this->status = $status;
        $this->urlImage = $urlImage;
        $this->urlPoster = $urlPoster;
        $this->idCategory = $idCategory;
    }

    // Getters
    public function getName(): string { return $this->name; }
    public function getStartDate(): \DateTimeInterface { return $this->startDate; }
    public function getEndDate(): \DateTimeInterface { return $this->endDate; }
    public function getLocation(): ?string { return $this->location; }
    public function getDescription(): ?string { return $this->description; }
    public function getStatus(): string { return $this->status; }
    public function getUrlImage(): ?array { return $this->urlImage; }
    public function getUrlPoster(): ?string { return $this->urlPoster; }
    public function getIdCategory(): ?int { return $this->idCategory; }
}