<?php

namespace App\Shared\Mapper;

/**
 * Interface for transforming data between different layers of the application.
 *
 * @template TInput
 * @template TOutput
 */
interface MapperInterface
{
    /**
     * Maps input data (e.g., a DTO or array) to a domain entity.
     *
     * @param TInput $input The input data.
     * @return TOutput The resulting domain entity.
     */
    public static function fromRequest(array $input);

    /**
     * Maps a domain entity to a response DTO or array.
     *
     * @param TOutput $entity The domain entity.
     * @return array The resulting response data.
     */
    public static function toResponse($entity): array;
}