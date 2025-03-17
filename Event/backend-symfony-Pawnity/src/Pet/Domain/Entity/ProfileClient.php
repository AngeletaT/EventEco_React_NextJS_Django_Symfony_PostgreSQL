<?php
namespace App\Pet\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "p_profileclient")]
class ProfileClient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "idProfileClient", type: "integer")]
    private ?int $id = null;

    #[ORM\Column(name: "idClient", type: "integer")]
    private int $idClient;

    #[ORM\Column(name: "firstName", type: "string", length: 100)]
    private string $firstName;

    #[ORM\Column(name: "lastName", type: "string", length: 100)]
    private string $lastName;

    #[ORM\Column(name: "phoneNumber", type: "string", length: 20, nullable: true)]
    private ?string $phoneNumber = null;

    #[ORM\Column(name: "dni", type: "string", length: 20, nullable: true)]
    private ?string $dni = null;

    #[ORM\Column(name: "bio", type: "string", length: 255, nullable: true)]
    private ?string $bio = null;

    #[ORM\Column(name: "avatarUrl", type: "string", length: 255, nullable: true)]
    private ?string $avatarUrl = null;

    #[ORM\Column(name: "createdAt", type: "datetime")]
    private \DateTime $createdAt;

    #[ORM\Column(name: "updatedAt", type: "datetime")]
    private \DateTime $updatedAt;

    public function __construct(
        int $idClient,
        string $firstName,
        string $lastName,
        ?string $phoneNumber = null,
        ?string $dni = null,
        ?string $bio = null,
        ?string $avatarUrl = null
    ) {
        $this->idClient = $idClient;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->phoneNumber = $phoneNumber;
        $this->dni = $dni;
        $this->bio = $bio;
        $this->avatarUrl = $avatarUrl;
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    // Getters
    public function getId(): ?int { return $this->id; }
    public function getIdClient(): int { return $this->idClient; }
    public function getFirstName(): string { return $this->firstName; }
    public function getLastName(): string { return $this->lastName; }
    public function getPhoneNumber(): ?string { return $this->phoneNumber; }
    public function getDni(): ?string { return $this->dni; }
    public function getBio(): ?string { return $this->bio; }
    public function getAvatarUrl(): ?string { return $this->avatarUrl; }
    public function getCreatedAt(): \DateTime { return $this->createdAt; }
    public function getUpdatedAt(): \DateTime { return $this->updatedAt; }

    // Setters
    public function setFirstName(string $firstName): self { $this->firstName = $firstName; return $this; }
    public function setLastName(string $lastName): self { $this->lastName = $lastName; return $this; }
    public function setPhoneNumber(?string $phoneNumber): self { $this->phoneNumber = $phoneNumber; return $this; }
    public function setDni(?string $dni): self { $this->dni = $dni; return $this; }
    public function setBio(?string $bio): self { $this->bio = $bio; return $this; }
    public function setAvatarUrl(?string $avatarUrl): self { $this->avatarUrl = $avatarUrl; return $this; }
    public function setUpdatedAt(\DateTime $updatedAt): self { $this->updatedAt = $updatedAt; return $this; }
}
