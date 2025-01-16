<?php

namespace App\Tests\E2E;

use Symfony\Component\Panther\PantherTestCase;

class HomePageTest extends PantherTestCase
{
    public function testHomePage(): void
    {
        $client = static::createPantherClient(['browser' => PantherTestCase::CHROME]);
        $crawler = $client->request('GET', '/');

        $this->assertSelectorTextContains('h1', 'Welcome');
    }
}