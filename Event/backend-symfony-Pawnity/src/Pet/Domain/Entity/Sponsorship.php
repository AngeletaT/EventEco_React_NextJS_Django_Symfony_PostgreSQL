<?php
namespace App\Pet\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "p_sponsorships")]
class Sponsorship
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "idsponsorship", type: "integer")]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: ProfileClient::class)]
    #[ORM\JoinColumn(name: "idclient", referencedColumnName: "idProfileClient")]
    private ProfileClient $client;

    #[ORM\ManyToOne(targetEntity: Pet::class)]
    #[ORM\JoinColumn(name: "idpet", referencedColumnName: "idpet")]
    private Pet $pet;

    #[ORM\Column(name: "idorg", type: "integer")]
    private int $idOrg;

    #[ORM\Column(name: "startdate", type: "datetime")]
    private \DateTime $startDate;

    #[ORM\Column(name: "enddate", type: "datetime", nullable: true)]
    private ?\DateTime $endDate = null;

    #[ORM\Column(name: "isactive", type: "boolean")]
    private bool $isActive = true;

    // Getters y setters...

    public function __construct(
        ProfileClient $client,
        Pet $pet,
        int $idOrg,
        \DateTime $startDate,
        ?\DateTime $endDate = null
    ) {
        $this->client = $client;
        $this->pet = $pet;
        $this->idOrg = $idOrg;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClient(): ProfileClient
    {
        return $this->client;
    }

    public function getPet(): Pet
    {
        return $this->pet;
    }

    public function getIdOrg(): int
    {
        return $this->idOrg;
    }   

    public function getStartDate(): \DateTime
    {
        return $this->startDate;
    }

    public function getEndDate(): ?\DateTime
    {
        return $this->endDate;
    }

    public function isActive(): bool
    {
        return $this->isActive;
    }
}
