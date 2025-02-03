<?php

namespace App\Shared\Doctrine\Enums;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;

class StatusEventEnumType extends Type
{
    public const NAME = 'statusevent';

    public const VALUES = [
        'Preparing',
        'Created',
        'InProgress',
        'Finished',
        'Canceled',
    ];

    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform): string
    {
        return sprintf("ENUM('%s')", implode("', '", self::VALUES));
    }

    public function convertToPHPValue($value, AbstractPlatform $platform): string
    {
        if (!in_array($value, self::VALUES, true)) {
            throw new \InvalidArgumentException(sprintf('Invalid value "%s" for enum "%s".', $value, self::NAME));
        }

        return $value;
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform): string
    {
        if (!in_array($value, self::VALUES, true)) {
            throw new \InvalidArgumentException(sprintf('Invalid value "%s" for enum "%s".', $value, self::NAME));
        }

        return $value;
    }

    public function getName(): string
    {
        return self::NAME;
    }

    public function requiresSQLCommentHint(AbstractPlatform $platform): bool
    {
        return true;
    }
}