<?php

declare(strict_types=1);

namespace App\Organizer\Presentation\InAdapter\Providers;

use App\Organizer\Application\UseCase\Query\ProfileQueryHandler;
use App\Organizer\Application\UseCase\Query\ProfileQuery;
use App\Organizer\Presentation\Assembler\Request\ProfileRequestAssembler;
use App\Organizer\Presentation\Assembler\Response\ProfileResponseAssembler;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProfileProvider extends AbstractController
{
    private ProfileQueryHandler $handler;
    private ProfileRequestAssembler $profileRequestAssembler;

    public function __construct(
        ProfileQueryHandler $handler,
        ProfileRequestAssembler $profileRequestAssembler
    ) {
        $this->handler = $handler;
        $this->profileRequestAssembler = $profileRequestAssembler;
    }

    /**
     * Endpoint para obtener el profile del organizer.
     *
     * @Route("/organizer/profile", name="get_organizer_profile", methods={"GET"})
     */
    public function __invoke(Request $request): JsonResponse
    {
        try {
            // Se crea el DTO ProfileRequest a partir de la request HTTP usando el assembler inyectado
            $profileRequest = $this->profileRequestAssembler->fromHttpRequest($request);

            // Se crea el ProfileQuery usando el idOrg obtenido.
            $profileQuery = new ProfileQuery($profileRequest->getIdOrg());

            // Se invoca el handler que procesa la consulta y retorna el DTO ProfileResponse.
            $profileResponse = $this->handler->__invoke($profileQuery);

            // Se transforma el DTO ProfileResponse en un array para la respuesta HTTP.
            $data = ProfileResponseAssembler::toArray($profileResponse);

            return new JsonResponse($data, JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
    }
}