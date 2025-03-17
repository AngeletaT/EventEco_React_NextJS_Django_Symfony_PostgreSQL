<?php
namespace App\Pet\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "p_adoptions")]
class Adoption
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "idadoption", type: "integer")]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: ProfileClient::class)]
    #[ORM\JoinColumn(name: "idclient", referencedColumnName: "idProfileClient")]
    private ProfileClient $client;

    #[ORM\ManyToOne(targetEntity: Pet::class)]
    #[ORM\JoinColumn(name: "idpet", referencedColumnName: "idpet")]
    private Pet $pet;

    #[ORM\Column(name: "idorg", type: "integer")]
    private int $idOrg;

    #[ORM\Column(name: "adoptiondate", type: "date")]
    private \DateTime $adoptionDate;

    #[ORM\Column(name: "lastreviewdate", type: "date", nullable: true)]
    private ?\DateTime $lastReviewDate = null;

    #[ORM\Column(name: "isactive", type: "boolean")]
    private bool $isActive = true;

    public function __construct(
        ProfileClient $client,
        Pet $pet,
        int $idOrg,
        \DateTime $adoptionDate,
        ?\DateTime $lastReviewDate = null
    ) {
        $this->client = $client;
        $this->pet = $pet;
        $this->idOrg = $idOrg;
        $this->adoptionDate = $adoptionDate;
        $this->lastReviewDate = $lastReviewDate;
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

    public function getAdoptionDate(): \DateTime
    {
        return $this->adoptionDate;
    }

    public function getLastReviewDate(): ?\DateTime
    {
        return $this->lastReviewDate;
    }

    public function getIdOrg(): int
    {
        return $this->idOrg;
    }

    public function isActive(): bool
    {
        return $this->isActive;
    }
}
