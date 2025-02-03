<?php

namespace App\Event\Presentation\Assembler\Request;

use Symfony\Component\HttpFoundation\Request;

class ListEventsByCategoryRequestAssembler
{
    public static function fromHttpRequest(Request $request): int
    {
        return (int) $request->get('idCategory');
    }
}