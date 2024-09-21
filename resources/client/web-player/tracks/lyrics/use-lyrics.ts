import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';

export interface SyncedLyricResponse {
  is_synced: true;
  lines: {time: number; text: string}[];
}

export interface PlainLyricResponse {
  is_synced: false;
  lines: {text: string}[];
}

type UseLyricsResponse = BackendResponse &
  (SyncedLyricResponse | PlainLyricResponse);

export function useLyrics(trackId: number | string) {
  return useQuery({
    queryKey: ['lyrics', trackId],
    queryFn: () => fetchLyrics(trackId),
  });
}

function fetchLyrics(trackId: number | string) {
  return apiClient
    .get<UseLyricsResponse>(`tracks/${trackId}/lyrics`)
    .then(response => response.data);
}
