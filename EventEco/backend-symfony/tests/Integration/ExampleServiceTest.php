<?php

namespace App\Tests\Integration;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use App\Service\ExampleService;

class ExampleServiceTest extends KernelTestCase
{
    public function testServiceExists(): void
    {
        self::bootKernel();
        $container = static::getContainer();
        $service = $container->get(ExampleService::class);

        $this->assertInstanceOf(ExampleService::class, $service);
        $this->assertSame('Action performed', $service->performAction());
    }
}