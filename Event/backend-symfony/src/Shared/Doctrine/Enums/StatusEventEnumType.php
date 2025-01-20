<?php

namespace App\Shared\Doctrine\Enums;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;

/**
 * Custom Doctrine type for the statusEvent enum.
 */
class StatusEventEnumType extends Type
{
    public const NAME = 'statusEvent'; // Database enum type name

    private const VALUES = [
        'Preparing',
        'Created',
        'InProgress',
        'Finished',
    ];

    /**
     * Get the SQL declaration for the enum type.
     *
     * @param array $fieldDeclaration
     * @param AbstractPlatform $platform
     * @return string
     */
    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform): string
    {
        return "ENUM('" . implode("', '", self::VALUES) . "')";
    }

    /**
     * Convert the database value to PHP.
     *
     * @param mixed $value
     * @param AbstractPlatform $platform
     * @return string|null
     */
    public function convertToPHPValue($value, AbstractPlatform $platform): ?string
    {
        if (!in_array($value, self::VALUES, true)) {
            throw new \InvalidArgumentException(sprintf('Invalid value "%s" for enum "%s".', $value, self::NAME));
        }

        return $value;
    }

    /**
     * Convert the PHP value to the database value.
     *
     * @param mixed $value
     * @param AbstractPlatform $platform
     * @return string|null
     */
    public function convertToDatabaseValue($value, AbstractPlatform $platform): ?string
    {
        if (!in_array($value, self::VALUES, true)) {
            throw new \InvalidArgumentException(sprintf('Invalid value "%s" for enum "%s".', $value, self::NAME));
        }

        return $value;
    }

    /**
     * Get the name of this custom type.
     *
     * @return string
     */
    public function getName(): string
    {
        return self::NAME;
    }

    /**
     * Indicate if this type requires SQL comment hint.
     *
     * @param AbstractPlatform $platform
     * @return bool
     */
    public function requiresSQLCommentHint(AbstractPlatform $platform): bool
    {
        return true;
    }
}