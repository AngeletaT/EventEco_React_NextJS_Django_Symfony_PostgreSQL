<?php

declare(strict_types=1);

namespace App\Organizer\Application\DTO\Response;

use DateTimeImmutable;

class UpdateProfileResponse
{
    private int $idProfileOrg;
    private int $idOrg;
    private string $name;
    private ?string $address;
    private ?string $urlLogo;
    private ?string $description;
    private ?string $urlWeb;
    private ?string $urlImage;
    private DateTimeImmutable $createdAt;
    private DateTimeImmutable $updatedAt;

    public function __construct(
        int $idProfileOrg,
        int $idOrg,
        string $name,
        ?string $address,
        ?string $urlLogo,
        ?string $description,
        ?string $urlWeb,
        ?string $urlImage,
        DateTimeImmutable $createdAt,
        DateTimeImmutable $updatedAt
    ) {
        $this->idProfileOrg = $idProfileOrg;
        $this->idOrg = $idOrg;
        $this->name = $name;
        $this->address = $address;
        $this->urlLogo = $urlLogo;
        $this->description = $description;
        $this->urlWeb = $urlWeb;
        $this->urlImage = $urlImage;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
    }

    // Getters...
    public function getIdProfileOrg(): int { return $this->idProfileOrg; }
    public function getIdOrg(): int { return $this->idOrg; }
    public function getName(): string { return $this->name; }
    public function getAddress(): ?string { return $this->address; }
    public function getUrlLogo(): ?string { return $this->urlLogo; }
    public function getDescription(): ?string { return $this->description; }
    public function getUrlWeb(): ?string { return $this->urlWeb; }
    public function getUrlImage(): ?string { return $this->urlImage; }
    public function getCreatedAt(): DateTimeImmutable { return $this->createdAt; }
    public function getUpdatedAt(): DateTimeImmutable { return $this->updatedAt; }
}