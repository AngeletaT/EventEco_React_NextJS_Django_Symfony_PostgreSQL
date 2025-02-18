<?php

declare(strict_types=1);

namespace App\Event\Application\DTO\Response;

use DateTimeImmutable;
use DateTimeInterface;

class CreateEventResponse
{
    private int $idEvent;
    private string $name;
    private DateTimeInterface $startDate;
    private DateTimeInterface $endDate;
    private ?string $location;
    private ?string $position;
    private ?string $description;
    private string $status;
    private ?array $urlImage; // Cambiado de ?string a ?array
    private ?string $urlPoster;
    private ?int $orgId;
    private ?int $idCategory;
    private DateTimeImmutable $createdAt;
    private DateTimeImmutable $updatedAt;

    public function __construct(
        int $idEvent,
        string $name,
        DateTimeInterface $startDate,
        DateTimeInterface $endDate,
        ?string $location,
        ?string $position,
        ?string $description,
        string $status,
        ?array $urlImage, // Cambiado de ?string a ?array
        ?string $urlPoster,
        ?int $orgId,
        ?int $idCategory,
        DateTimeImmutable $createdAt,
        DateTimeImmutable $updatedAt
    ) {
        $this->idEvent = $idEvent;
        $this->name = $name;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->location = $location;
        $this->position = $position;
        $this->description = $description;
        $this->status = $status;
        $this->urlImage = $urlImage;
        $this->urlPoster = $urlPoster;
        $this->orgId = $orgId;
        $this->idCategory = $idCategory;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
    }

    // Getters...
    public function getIdEvent(): int { return $this->idEvent; }
    public function getName(): string { return $this->name; }
    public function getStartDate(): DateTimeInterface { return $this->startDate; }
    public function getEndDate(): DateTimeInterface { return $this->endDate; }
    public function getLocation(): ?string { return $this->location; }
    public function getPosition(): ?string { return $this->position; }
    public function getDescription(): ?string { return $this->description; }
    public function getStatus(): string { return $this->status; }
    public function getUrlImage(): ?array { return $this->urlImage; }
    public function getUrlPoster(): ?string { return $this->urlPoster; }
    public function getOrgId(): ?int { return $this->orgId; }
    public function getIdCategory(): ?int { return $this->idCategory; }
    public function getCreatedAt(): DateTimeImmutable { return $this->createdAt; }
    public function getUpdatedAt(): DateTimeImmutable { return $this->updatedAt; }
}