import {useSettings} from '@common/core/settings/use-settings';
import {useCuedTrack} from '@app/web-player/player-controls/use-cued-track';
import {IconButton} from '@common/ui/buttons/icon-button';
import {MediaMicrophoneIcon} from '@common/icons/media/media-microphone';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Trans} from '@common/i18n/trans';
import {Link} from 'react-router-dom';

export function LyricsButton() {
  const {player} = useSettings();
  const track = useCuedTrack();

  if (!track || player?.hide_lyrics) {
    return null;
  }

  return (
    <Tooltip label={<Trans message="Lyrics" />}>
      <IconButton elementType={Link} to={'/lyrics'}>
        <MediaMicrophoneIcon />
      </IconButton>
    </Tooltip>
  );
}
