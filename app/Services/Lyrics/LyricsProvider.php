<?php

namespace App\Services\Lyrics;

interface LyricsProvider
{
    public function getLyrics(
        string $artistName,
        string $trackName,
        string $albumName = null,
        int $duration = null,
    ): ?array;
}
