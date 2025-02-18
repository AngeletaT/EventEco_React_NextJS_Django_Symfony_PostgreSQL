<?php

namespace App\Complement\Application\UseCase\Command\UpdateComplement;

use App\Complement\Application\DTO\Request\UpdateComplementRequest;

class UpdateComplementCommand
{
    private int $complementId;
    private UpdateComplementRequest $updateRequest;

    public function __construct(int $complementId, UpdateComplementRequest $updateRequest)
    {
        $this->complementId = $complementId;
        $this->updateRequest = $updateRequest;
    }

    public function getComplementId(): int {
        return $this->complementId;
    }
    public function getUpdateRequest(): UpdateComplementRequest {
        return $this->updateRequest;
    }
}