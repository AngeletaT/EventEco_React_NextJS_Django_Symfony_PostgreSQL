<?php

namespace App\Event\Application\DTO\Request;

use DateTimeInterface;

class CreateSubEventRequest
{
    private string $name;
    private DateTimeInterface $startDate;
    private DateTimeInterface $endDate;
    private ?string $description;
    private ?array $urlImage;
    private ?string $urlPoster;
    private string $status;

    public function __construct(
        string $name,
        DateTimeInterface $startDate,
        DateTimeInterface $endDate,
        ?string $description,
        ?array $urlImage,
        ?string $urlPoster,
        string $status
    ) {
        $this->name = $name;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->description = $description;
        $this->urlImage = $urlImage;
        $this->urlPoster = $urlPoster;
        $this->status = $status;
    }

    public function getName(): string {
        return $this->name;
    }
    public function getStartDate(): DateTimeInterface {
        return $this->startDate;
    }
    public function getEndDate(): DateTimeInterface {
        return $this->endDate;
    }
    public function getDescription(): ?string {
        return $this->description;
    }
    public function getUrlImage(): ?array {
        return $this->urlImage;
    }
    public function getUrlPoster(): ?string {
        return $this->urlPoster;
    }
    public function getStatus(): string {
        return $this->status;
    }
}