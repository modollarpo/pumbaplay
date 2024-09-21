import {Track} from '../track';

export interface Lyric {
  id: number;
  text: string;
  track_id: number;
  track?: Track;
  is_synced: boolean;
  updated_at: string;
}
