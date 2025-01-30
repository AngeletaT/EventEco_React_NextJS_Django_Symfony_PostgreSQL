<?php

use Doctrine\DBAL\Types\Type;
use App\Shared\Doctrine\Enums\StatusEventEnumType;

// Registrar el tipo ENUM si no está registrado
if (!Type::hasType(StatusEventEnumType::NAME)) {
    Type::addType(StatusEventEnumType::NAME, StatusEventEnumType::class);
}