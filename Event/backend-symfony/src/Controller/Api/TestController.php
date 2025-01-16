<?php

namespace App\Controller\Api;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TestController
{
    /**
     * @Route("/api/test", name="api_test", methods={"GET"})
     * 
     * @OA\Get(
     *     path="/api/test",
     *     summary="Get a test response",
     *     description="This endpoint returns a simple JSON response for testing purposes.",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Hello, Nelmio!")
     *         )
     *     )
     * )
     */
    #[Route('/api/test', name: 'api_test', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return new JsonResponse([
            'message' => 'Hola, Ultima fila!',
        ]);
    }
}