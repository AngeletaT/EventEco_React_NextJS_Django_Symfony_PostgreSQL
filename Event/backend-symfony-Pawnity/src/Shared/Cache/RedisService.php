<?php

namespace App\Shared\Cache;

use Predis\Client;

class RedisService
{
    private Client $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function set(string $key, string $value, int $ttl = 3600): void
    {
        $this->client->set($key, $value);
        $this->client->expire($key, $ttl);
    }

    public function get(string $key): ?string
    {
        return $this->client->get($key);
    }

    public function delete(string $key): void
    {
        $this->client->del([$key]);
    }
}