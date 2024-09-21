<?php

namespace App\Services\Lyrics;

use Illuminate\Support\Facades\Http;

class LrclibLyricsProvider implements LyricsProvider
{
    public function getLyrics(
        string $artistName,
        string $trackName,
        string $albumName = null,
        int $duration = null,
    ): ?array {
        $durationInSeconds = $duration ? $duration / 1000 : null;

        $url = "https://lrclib.net/api/search?artist_name=$artistName&track_name=$trackName";
        if ($albumName) {
            $url .= "&album_name=$albumName";
        }
        //        if ($duration) {
        //            $url .= "&duration=$durationInSeconds";
        //        }

        $response = Http::withHeaders([
            'User-Agent' =>
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
            'Accept-Language' => 'en-US, en;q=0.5',
            'Content-Language' => 'en-us',
        ])->get($url);

        if (isset($response->json()[0])) {
            return [
                'syncedLyric' => $response->json()[0]['syncedLyrics'] ?? null,
                'plainLyric' => $response->json()[0]['plainLyrics'] ?? null,
            ];
        }

        return null;
    }
}
