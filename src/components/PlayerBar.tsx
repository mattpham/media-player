import React from 'react';
import styled from 'styled-components/macro';
import { connect } from 'react-redux';

import { AppState } from '../reducers';
import {
  togglePlay,
  stop
  // setRepeat,
  // toggleMuted,
  // setVolume,
  // setPlaybackRate
} from '../actions/player';
import Duration from './Duration';
import { Button } from './common/Button';
import PlayerScrubber from './PlayerScrubber';
const Bar = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
`;
const PlayerBar: React.FC<any> = ({
  isPlaying,
  duration,
  progress,
  togglePlay
}) => {
  return (
    <Bar>
      <Button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</Button>
      <Button onClick={stop}>Stop</Button>
      <span>
        <Duration seconds={duration * progress} />
        {' / '}
        <Duration seconds={duration} />
      </span>
      <PlayerScrubber />
    </Bar>
  );
};

const mapState = (state: AppState) => {
  const {
    duration,
    progress,
    buffered,
    isPlaying,
    isMuted,
    volume
  } = state.player;
  return {
    duration,
    progress,
    buffered,
    isPlaying,
    isMuted,
    volume
  };
};
const mapDispatch = {
  // load,
  // play,
  // pause,
  stop,
  togglePlay
  // setRepeat,
  // toggleMuted,
  // setVolume,
  // seek,
  // setPlaybackRate
};
export default connect(
  mapState,
  mapDispatch
)(PlayerBar);
