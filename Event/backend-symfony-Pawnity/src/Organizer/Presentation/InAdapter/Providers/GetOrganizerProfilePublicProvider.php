<?php

declare(strict_types=1);

namespace App\Organizer\Presentation\InAdapter\Providers;

use App\Organizer\Application\DTO\Request\ProfileRequest;
use App\Organizer\Application\UseCase\InPort\ProfileInterface;
use App\Organizer\Presentation\Assembler\Response\ProfileResponseAssembler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetOrganizerProfilePublicProvider extends AbstractController
{
    private ProfileInterface $profileService;

    public function __construct(ProfileInterface $profileService)
    {
        $this->profileService = $profileService;
    }

    /**
     * Endpoint público para obtener el perfil de un organizer por su id.
     *
     * @Route("/event/organizer/{id}", name="get_organizer_profile_public", methods={"GET"})
     *
     * @param Request $request
     * @param int $id El id del organizer
     * @return JsonResponse
     */
    public function __invoke(Request $request, int $id): JsonResponse
    {
        try {
            // Crea el DTO de request con el id proporcionado en la URL.
            $profileRequest = new ProfileRequest($id);
            
            // Llama al caso de uso (service) para obtener el perfil.
            $profileResponse = $this->profileService->profile($profileRequest);
            
            // Transforma el DTO de respuesta en un array usando el assembler.
            $data = ProfileResponseAssembler::toArray($profileResponse);
            
            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}