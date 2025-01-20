<?php

namespace App\Infrastructure\Persistence\Doctrine\Enums;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;

/**
 * Custom Doctrine type for the petGender ENUM.
 */
class PetGenderEnumType extends Type
{
    public const NAME = 'petGender';

    private const VALUES = [
        'male',
        'female',
    ];

    /**
     * Get the SQL declaration for the ENUM type.
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
     * Convert a value from the database to PHP.
     *
     * @param mixed $value
     * @param AbstractPlatform $platform
     * @return mixed
     */
    public function convertToPHPValue($value, AbstractPlatform $platform): mixed
    {
        if (!in_array($value, self::VALUES, true)) {
            throw new \InvalidArgumentException("Invalid value for 'petGender' ENUM: $value");
        }

        return $value;
    }

    /**
     * Convert a PHP value to a database value.
     *
     * @param mixed $value
     * @param AbstractPlatform $platform
     * @return mixed
     */
    public function convertToDatabaseValue($value, AbstractPlatform $platform): mixed
    {
        if (!in_array($value, self::VALUES, true)) {
            throw new \InvalidArgumentException("Invalid value for 'petGender' ENUM: $value");
        }

        return $value;
    }

    /**
     * Get the name of the custom Doctrine type.
     *
     * @return string
     */
    public function getName(): string
    {
        return self::NAME;
    }

    /**
     * Require SQL comment hint for the type.
     *
     * @param AbstractPlatform $platform
     * @return bool
     */
    public function requiresSQLCommentHint(AbstractPlatform $platform): bool
    {
        return true;
    }
}