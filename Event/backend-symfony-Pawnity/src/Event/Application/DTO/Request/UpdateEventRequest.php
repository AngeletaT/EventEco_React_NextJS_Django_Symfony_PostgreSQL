<?php

declare(strict_types=1);

namespace App\Event\Application\DTO\Request;

class UpdateEventRequest
{
    private ?string $name;
    private ?\DateTimeInterface $startDate;
    private ?\DateTimeInterface $endDate;
    private ?string $location;
    private ?string $position;
    private ?string $description;
    private ?string $status;
    private ?array $urlImage;
    private ?string $urlPoster;
    private ?int $idCategory;

    public function __construct(
        ?string $name = null,
        ?\DateTimeInterface $startDate = null,
        ?\DateTimeInterface $endDate = null,
        ?string $location = null,
        ?string $position = null,
        ?string $description = null,
        ?string $status = null,
        ?array $urlImage = null,
        ?string $urlPoster = null,
        ?int $idCategory = null
    ) {
        $this->name = $name;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->location = $location;
        $this->position = $position;
        $this->description = $description;
        $this->status = $status;
        $this->urlImage = $urlImage;
        $this->urlPoster = $urlPoster;
        $this->idCategory = $idCategory;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function getUrlImage(): ?array
    {
        return $this->urlImage;
    }

    public function getUrlPoster(): ?string
    {
        return $this->urlPoster;
    }

    public function getIdCategory(): ?int
    {
        return $this->idCategory;
    }
}