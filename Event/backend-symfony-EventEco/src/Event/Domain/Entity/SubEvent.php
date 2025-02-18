<?php

namespace App\Event\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;
use DateTimeImmutable;
use DateTimeInterface;
use App\Shared\Doctrine\Enums\StatusSubEventsEnumType;

#[ORM\Entity]
#[ORM\Table(name: "e_subevents")]
class SubEvent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "idsubevents", type: "integer")]
    private ?int $idSubEvents = null;

    #[ORM\Column(type: "string", length: 100)]
    private string $name;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(name: "startdate", type: "date")]
    private DateTimeInterface $startDate;

    #[ORM\Column(name: "enddate", type: "date")]
    private DateTimeInterface $endDate;

    #[ORM\Column(name: "urlimage", type: "simple_array", nullable: true)]
    private ?array $urlImage = null;

    #[ORM\Column(name: "urlposter", type: "string", length: 255, nullable: true)]
    private ?string $urlPoster = null;

    #[ORM\Column(name: "status", type: "statusSubEvents", options: ["default" => "Confirmed"])]
    private string $status;

    #[ORM\Column(name: "isactive", type: "boolean", options: ["default" => true])]
    private bool $isActive = true;

    #[ORM\Column(name: "createdat", type: "datetime_immutable")]
    private DateTimeImmutable $createdAt;

    #[ORM\Column(name: "updatedat", type: "datetime_immutable")]
    private DateTimeImmutable $updatedAt;

    // Relación con Event (muchos subEvents para un Event)
    #[ORM\ManyToOne(targetEntity: Event::class, inversedBy: "subEvents")]
    #[ORM\JoinColumn(name: "idevent", referencedColumnName: "idevent", nullable: false)]
    private Event $event;

    public function __construct(
        string $name,
        DateTimeInterface $startDate,
        DateTimeInterface $endDate,
        ?string $description,
        ?array $urlImage,
        ?string $urlPoster,
        string $status,
        Event $event
    ) {
        // Se puede validar que $status esté dentro de los valores permitidos (por ejemplo, usando StatusSubEventsEnumType::VALUES)
        $this->name = $name;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->description = $description;
        $this->urlImage = $urlImage;
        $this->urlPoster = $urlPoster;
        $this->status = $status;
        $this->event = $event;
        $this->createdAt = new DateTimeImmutable();
        $this->updatedAt = new DateTimeImmutable();
    }

    // Getters
    public function getIdSubEvents(): ?int { return $this->idSubEvents; }
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
    public function getEvent(): Event { return $this->event; }

    public function setName(string $name): self {
        $this->name = $name;
        return $this;
    }

    public function setDescription(?string $description): self {
        $this->description = $description;
        return $this;
    }

    public function setStartDate(DateTimeInterface $startDate): self {
        $this->startDate = $startDate;
        return $this;
    }

    public function setEndDate(DateTimeInterface $endDate): self {
        $this->endDate = $endDate;
        return $this;
    }

    public function setUrlImage(?array $urlImage): self {
        $this->urlImage = $urlImage;
        return $this;
    }

    public function setUrlPoster(?string $urlPoster): self {
        $this->urlPoster = $urlPoster;
        return $this;
    }

    public function setStatus(string $status): self {
        $this->status = $status;
        return $this;
    }

    public function setUpdatedAt(DateTimeImmutable $updatedAt): self {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    public function setIsActive(bool $isActive): self {
        $this->isActive = $isActive;
        return $this;
    }
}