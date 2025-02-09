<?php

namespace App\Organizer\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;
use DateTimeImmutable;

#[ORM\Entity]
#[ORM\Table(name: "p_profileorganizer")]
class ProfileOrganizer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "idProfileOrg", type: "integer")]
    private ?int $idProfileOrg = null;

    #[ORM\OneToOne(targetEntity: Organizer::class)]
    #[ORM\JoinColumn(name: "idOrg", referencedColumnName: "idorg", nullable: false)]
    private Organizer $organizer;

    #[ORM\Column(name: "name", type: "string", length: 100)]
    private string $name;

    #[ORM\Column(name: "address", type: "string", length: 200, nullable: true)]
    private ?string $address = null;

    #[ORM\Column(name: "urlLogo", type: "string", length: 255, nullable: true)]
    private ?string $urlLogo = null;

    #[ORM\Column(name: "description", type: "string", length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(name: "urlWeb", type: "string", length: 255, nullable: true)]
    private ?string $urlWeb = null;

    #[ORM\Column(name: "urlImage", type: "string", length: 255, nullable: true)]
    private ?string $urlImage = null;

    #[ORM\Column(name: "createdAt", type: "datetime_immutable")]
    private DateTimeImmutable $createdAt;

    #[ORM\Column(name: "updatedAt", type: "datetime_immutable")]
    private DateTimeImmutable $updatedAt;

    public function __construct(Organizer $organizer, string $name)
    {
        $this->organizer  = $organizer;
        $this->name       = $name;
        $this->createdAt  = new DateTimeImmutable();
        $this->updatedAt  = new DateTimeImmutable();
    }

    // Getters

    public function getIdProfileOrg(): ?int
    {
        return $this->idProfileOrg;
    }

    public function getOrganizer(): Organizer
    {
        return $this->organizer;
    }

    public function getName(): string
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

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): DateTimeImmutable
    {
        return $this->updatedAt;
    }

    // Setters

    public function setOrganizer(Organizer $organizer): self
    {
        $this->organizer = $organizer;
        return $this;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;
        return $this;
    }

    public function setUrlLogo(?string $urlLogo): self
    {
        $this->urlLogo = $urlLogo;
        return $this;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function setUrlWeb(?string $urlWeb): self
    {
        $this->urlWeb = $urlWeb;
        return $this;
    }

    public function setUrlImage(?string $urlImage): self
    {
        $this->urlImage = $urlImage;
        return $this;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function setUpdatedAt(DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }
}