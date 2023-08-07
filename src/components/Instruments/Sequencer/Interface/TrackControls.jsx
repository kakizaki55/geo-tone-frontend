import styles from './Channel.css';
import VolumeFader from '../../../Controls/VolumeFader/VolumeFader.jsx';
import EffectFader from '../../../Controls/EffectFader/EffectFader.jsx';

export default function TrackControls({ id, volume, setVolume, fx, setFx }) {
  return (
    <div className={styles.controls}>
      <VolumeFader
        id={`channel-${id}-volume`}
        value={volume}
        handleChange={(e) => setVolume(e.target.value)}
      />
      <EffectFader
        id={`channel-${id}-reverb`}
        effect="Reverb"
        value={fx.reverb}
        handleChange={(e) => setFx({ ...fx, reverb: e.target.value })}
      />
    </div>
  );
}
