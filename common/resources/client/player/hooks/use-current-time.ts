import {useEffect, useRef, useState} from 'react';
import {usePlayerActions} from '@common/player/hooks/use-player-actions';
import {usePlayerStore} from '@common/player/hooks/use-player-store';
import {useCuedTrack} from '@app/web-player/player-controls/use-cued-track';

interface Props {
  precision: 'ms' | 'seconds';
}
export function useCurrentTime({precision}: Props = {precision: 'ms'}) {
  const timeRef = useRef(0);
  const {subscribe, getCurrentTime} = usePlayerActions();
  const track = useCuedTrack();
  const providerKey = usePlayerStore(s =>
    s.providerName && s.cuedMedia?.id
      ? `${s.providerName}+${s.cuedMedia.id}`
      : null,
  );

  const [currentTime, setCurrentTime] = useState(() => getCurrentTime());

  useEffect(() => {
    return subscribe({
      progress: ({currentTime}) => {
        const time = precision === 'ms' ? currentTime : Math.floor(currentTime);
        if (timeRef.current !== time) {
          setCurrentTime(time);
          timeRef.current = time;
        }
      },
    });
  }, [precision, subscribe]);

  // update current time when media or provider changes
  useEffect(() => {
    if (providerKey) {
      setCurrentTime(getCurrentTime());
    }
  }, [providerKey, getCurrentTime]);

  return currentTime;
}
