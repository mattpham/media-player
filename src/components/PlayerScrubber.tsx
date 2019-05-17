import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import { seek } from '../actions/player';
interface ScrubberProps {
  progress: number;
  buffered?: number;
  duration?: number;
  seek: (...args: Parameters<typeof seek>) => void;
}
const Scrubber: React.FC<ScrubberProps> = ({
  progress,
  buffered,
  duration,
  seek
}) => {
  const [seeking, setSeeking] = useState(false);
  const [seekTo, setSeekTo] = useState(progress);

  function onSeekMouseDown() {
    setSeeking(true);
  }
  const onSeekChange = (e: any) => {
    setSeekTo(parseFloat(e.target.value));
  };
  const onSeekMouseUp = (e: any) => {
    setSeeking(false);
    seek(parseFloat(e.target.value));
  };

  return (
    <input
      type="range"
      min={0}
      max={1}
      step="any"
      value={seeking ? seekTo : progress}
      onMouseDown={onSeekMouseDown}
      onChange={onSeekChange}
      onMouseUp={onSeekMouseUp}
    />
  );
};

const mapState = ({ player }: AppState) => {
  const { progress, buffered, duration } = player;
  return {
    progress,
    buffered,
    duration
  };
};

export default connect(
  mapState,
  { seek }
)(Scrubber);
