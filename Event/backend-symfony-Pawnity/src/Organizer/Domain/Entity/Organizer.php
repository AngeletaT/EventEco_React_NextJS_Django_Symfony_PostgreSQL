<?php

namespace App\Organizer\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;
use DateTimeImmutable;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;

#[ORM\Entity]
#[ORM\Table(name: "p_organizer")]
#[ApiResource(
    operations: [
        new Post(
            name: 'create_organizer',
            uriTemplate: '/organizers',
            description: 'Add a new organizer to the system.',
            denormalizationContext: [
                'groups' => ['organizer_write']
            ]
        )
    ]
)]
class Organizer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "idorg", type: "integer")]
    private ?int $idOrg = null;

    #[ORM\Column(name: "orguuid", type: "uuid", unique: true)]
    private string $uuid;

    #[ORM\Column(type: "string", length: 100, unique: true)]
    private string $email;

    #[ORM\Column(type: "string", length: 255)]
    private string $password;

    #[ORM\Column(type: "string", length: 20, unique: true)]
    private string $nif;

    #[ORM\Column(name: "refreshtoken", type: "string", length: 255, nullable: true)]
    private ?string $refreshToken = null;

    #[ORM\Column(name: "isactive", type: "boolean", options: ["default" => true])]
    private bool $isActive = true;

    #[ORM\Column(name: "createdat", type: "datetime_immutable")]
    private DateTimeImmutable $createdAt;

    #[ORM\Column(name: "updatedat", type: "datetime_immutable")]
    private DateTimeImmutable $updatedAt;

    public function __construct(
        Uuid $uuid,
        string $email,
        string $password,
        string $nif,
        ?string $refreshToken = null
    ) {
        $this->uuid = $uuid->toRfc4122();
        $this->email = $email;
        $this->password = $password;
        $this->nif = $nif;
        $this->refreshToken = $refreshToken;
        $this->createdAt = new DateTimeImmutable();
        $this->updatedAt = new DateTimeImmutable();
    }

    // Getters
    public function getIdOrg(): ?int { return $this->idOrg; }
    public function getUuid(): string { return $this->uuid; }
    public function getEmail(): string { return $this->email; }
    public function getPassword(): string { return $this->password; }
    public function getNif(): string { return $this->nif; }
    public function getRefreshToken(): ?string { return $this->refreshToken; }
    public function isActive(): bool { return $this->isActive; }
    public function getCreatedAt(): DateTimeImmutable { return $this->createdAt; }
    public function getUpdatedAt(): DateTimeImmutable { return $this->updatedAt; }

    // Setters
    public function setEmail(string $email): void { $this->email = $email; }
    public function setPassword(string $password): void { $this->password = $password; }
    public function setUpdatedAt(DateTimeImmutable $updatedAt): void { $this->updatedAt = $updatedAt; }
}