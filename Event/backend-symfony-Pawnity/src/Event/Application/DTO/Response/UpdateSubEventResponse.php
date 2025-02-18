<?php

namespace App\Event\Application\DTO\Response;

use DateTimeImmutable;
use DateTimeInterface;

class UpdateSubEventResponse
{
    private int $idSubEvents;
    private string $name;
    private ?string $description;
    private DateTimeInterface $startDate;
    private DateTimeInterface $endDate;
    private ?array $urlImage;
    private ?string $urlPoster;
    private string $status;
    private bool $isActive;
    private DateTimeImmutable $createdAt;
    private DateTimeImmutable $updatedAt;

    public function __construct(
        int $idSubEvents,
        string $name,
        ?string $description,
        DateTimeInterface $startDate,
        DateTimeInterface $endDate,
        ?array $urlImage,
        ?string $urlPoster,
        string $status,
        bool $isActive,
        DateTimeImmutable $createdAt,
        DateTimeImmutable $updatedAt
    ) {
        $this->idSubEvents = $idSubEvents;
        $this->name = $name;
        $this->description = $description;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->urlImage = $urlImage;
        $this->urlPoster = $urlPoster;
        $this->status = $status;
        $this->isActive = $isActive;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
    }

    public function getIdSubEvents(): int { return $this->idSubEvents; }
    public function getName(): string { return $this->name; }
    public function getDescription(): ?string { return $this->description; }
    public function getStartDate(): DateTimeInterface { return $this->startDate; }
    public function getEndDate(): DateTimeInterface { return $this->endDate; }
    public function getUrlImage(): ?array { return $this->urlImage; }
    public function getUrlPoster(): ?string { return $this->urlPoster; }
    public function getStatus(): string { return $this->status; }
    public function isActive(): bool { return $this->isActive; }
    public function getCreatedAt(): DateTimeImmutable { return $this->createdAt; }
    public function getUpdatedAt(): DateTimeImmutable { return $this->updatedAt; }
}