<?php

declare(strict_types=1);

namespace App\Organizer\Application\DTO\Request;

class UpdateProfileRequest
{
    private int $idOrg;
    private ?string $name;
    private ?string $address;
    private ?string $urlLogo;
    private ?string $description;
    private ?string $urlWeb;
    private ?string $urlImage;

    public function __construct(
        int $idOrg,
        ?string $name = null,
        ?string $address = null,
        ?string $urlLogo = null,
        ?string $description = null,
        ?string $urlWeb = null,
        ?string $urlImage = null
    ) {
        $this->idOrg = $idOrg;
        $this->name = $name;
        $this->address = $address;
        $this->urlLogo = $urlLogo;
        $this->description = $description;
        $this->urlWeb = $urlWeb;
        $this->urlImage = $urlImage;
    }

    public function getIdOrg(): int
    {
        return $this->idOrg;
    }
    public function getName(): ?string
    {
        return $this->name;
    }
    public function getAddress(): ?string
    {
        return $this->address;
    }
    public function getUrlLogo(): ?string
    {
        return $this->urlLogo;
    }
    public function getDescription(): ?string
    {
        return $this->description;
    }
    public function getUrlWeb(): ?string
    {
        return $this->urlWeb;
    }
    public function getUrlImage(): ?string
    {
        return $this->urlImage;
    }
}