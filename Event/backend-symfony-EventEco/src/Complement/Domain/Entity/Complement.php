<?php

namespace App\Complement\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "e_complements")]
class Complement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "idcomplement", type: "integer")]
    private ?int $idComplement = null;

    #[ORM\Column(name: "name", type: "string", length: 100)]
    private string $name;

    #[ORM\Column(name: "description", type: "text", nullable: true)]
    private ?string $description;

    #[ORM\Column(name: "price", type: "decimal", precision: 10, scale: 2, nullable: true)]
    private ?float $price;

    #[ORM\Column(name: "imageurl", type: "string", length: 255, nullable: true)]
    private ?string $imageUrl;

    #[ORM\Column(name: "eventslug", type: "string", length: 100)]
    private string $eventSlug;

    #[ORM\Column(name: "isactive", type: "boolean", nullable: false, options: ["default" => true])]
    private bool $isActive = true;

    #[ORM\Column(name: "createdat", type: "datetime")]
    private \DateTime $createdAt;

    #[ORM\Column(name: "updatedat", type: "datetime")]
    private \DateTime $updatedAt;

    public function __construct(
        string $name,
        ?string $description,
        ?float $price,
        ?string $imageUrl,
        string $eventSlug
    ) {
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
        $this->imageUrl = $imageUrl;
        $this->eventSlug = $eventSlug;
        $this->isActive = true;
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    // Getters y setters

    public function getIdComplement(): ?int
    {
        return $this->idComplement;
    }

    public function getName(): string
    {
        return $this->name;
    }
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }
    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }
    public function setPrice(?float $price): self
    {
        $this->price = $price;
        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }
    public function setImageUrl(?string $imageUrl): self
    {
        $this->imageUrl = $imageUrl;
        return $this;
    }

    public function getEventSlug(): string
    {
        return $this->eventSlug;
    }
    public function setEventSlug(string $eventSlug): self
    {
        $this->eventSlug = $eventSlug;
        return $this;
    }

    public function isActive(): bool
    {
        return $this->isActive;
    }
    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;
        return $this;
    }

    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }
    public function getUpdatedAt(): \DateTime
    {
        return $this->updatedAt;
    }
    public function setUpdatedAt(\DateTime $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }
}