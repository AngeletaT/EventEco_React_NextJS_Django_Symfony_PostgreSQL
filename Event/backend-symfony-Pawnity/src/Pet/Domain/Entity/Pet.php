<?php

namespace App\Pet\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;
use DateTime;

#[ORM\Entity]
#[ORM\Table(name: "P_pets")]
class Pet
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "idpet", type: "integer")]
    private ?int $id = null;

    #[ORM\Column(name: "uuidpet", type: "uuid", unique: true)]
    private string $uuid;

    #[ORM\Column(type: "string", length: 100)]
    private string $name;

    #[ORM\Column(type: "string", length: 50)]
    private string $species;

    #[ORM\Column(type: "string", length: 100, nullable: true)]
    private ?string $breed;

    #[ORM\Column(type: "string", length: 50)]
    private string $gender;

    #[ORM\Column(name:"birthdate",type: "date")]
    private DateTime $birthDate;

    #[ORM\Column(type: "text", nullable: true)]
    private ?string $description;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    private ?string $image;

    #[ORM\Column(type: "string", length: 50, options: ["default" => "available"])]
    private string $status;

    #[ORM\Column(name:"idorg",type: "integer")]
    private int $idOrg;

    #[ORM\Column(name:"createdat",type: "datetime", options: ["default" => "CURRENT_TIMESTAMP"])]
    private DateTime $createdAt;

    #[ORM\Column(name:"updatedat",type: "datetime", options: ["default" => "CURRENT_TIMESTAMP"])]
    private DateTime $updatedAt;

    #[ORM\Column(name: "isactive", type: "boolean", options: ["default" => true])]
    private bool $isActive;

    public function __construct(
        string $name,
        string $species,
        string $gender,
        DateTime $birthDate,
        int $idOrg,
        ?string $breed = null,
        ?string $description = null,
        ?string $image = null,
        string $status = 'available'
    ) {
        $this->uuid      = uuid_create(UUID_TYPE_RANDOM);
        $this->name      = $name;
        $this->species   = $species;
        $this->gender    = $gender;
        $this->birthDate = $birthDate;
        $this->idOrg     = $idOrg;
        $this->breed     = $breed;
        $this->description = $description;
        $this->image     = $image;
        $this->status    = $status;
        $this->createdAt = new DateTime();
        $this->updatedAt = new DateTime();
        $this->isActive  = true;
    }

    // Getters
    public function getId(): ?int { return $this->id; }
    public function getUuid(): string { return $this->uuid; }
    public function getName(): string { return $this->name; }
    public function getSpecies(): string { return $this->species; }
    public function getBreed(): ?string { return $this->breed; }
    public function getGender(): string { return $this->gender; }
    public function getBirthDate(): DateTime { return $this->birthDate; }
    public function getDescription(): ?string { return $this->description; }
    public function getImage(): ?string { return $this->image; }
    public function getStatus(): string { return $this->status; }
    public function getIdOrg(): int { return $this->idOrg; }
    public function getCreatedAt(): DateTime { return $this->createdAt; }
    public function getUpdatedAt(): DateTime { return $this->updatedAt; }
    public function isActive(): bool { return $this->isActive; }

    // Setters
    public function setName(string $name): self { $this->name = $name; return $this; }
    public function setSpecies(string $species): self { $this->species = $species; return $this; }
    public function setBreed(?string $breed): self { $this->breed = $breed; return $this; }
    public function setGender(string $gender): self { $this->gender = $gender; return $this; }
    public function setBirthDate(DateTime $birthDate): self { $this->birthDate = $birthDate; return $this; }
    public function setDescription(?string $description): self { $this->description = $description; return $this; }
    public function setImage(?string $image): self { $this->image = $image; return $this; }
    public function setStatus(string $status): self { $this->status = $status; return $this; }
    public function setIdOrg(int $idOrg): self { $this->idOrg = $idOrg; return $this; }
    public function setUpdatedAt(DateTime $updatedAt): self { $this->updatedAt = $updatedAt; return $this; }
    public function setActive(bool $isActive): self { $this->isActive = $isActive; return $this; }
}
