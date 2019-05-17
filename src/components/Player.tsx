import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import styled from 'styled-components/macro';

import { usePlayerRegistry } from '../middleware';
import { AppState } from '../reducers';
import {
  play,
  pause,
  stop,
  progressUpdate,
  durationUpdate,
} from '../actions/player';

// Wrapper to maintain aspect ratio
const Wrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  background-color: rgba(0, 0, 0, 0.2);
`;

interface PlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  url: any;
  volume: number;
  pause: Function;
  stop: Function;
  progressUpdate: (...args: Parameters<typeof progressUpdate>) => void;
  durationUpdate: (...args: Parameters<typeof durationUpdate>) => void;
}

const Player: React.FC<PlayerProps> = ({
  isPlaying,
  isMuted,
  url,
  volume,
  pause,
  stop,
  progressUpdate,
  durationUpdate
}) => {
  const registerPlayer = usePlayerRegistry<ReactPlayer>();

  const onPlay = () => {
    console.log('onPlay');
    // play();
  };

  const onPause = () => {
    console.log('onPause');
    pause();
  };

  const onProgress = (e: any) => {
    console.log('onProgress', e);
    const { loaded, played } = e;
    progressUpdate(played, loaded);
  };
  const onEnded = () => {
    console.log('onEnded');
    stop();
  };

  const onDuration = (duration: any) => {
    console.log('onDuration', duration);
    durationUpdate(duration);
  };

  return (
    <Wrapper>
      <ReactPlayer
        css={`
          position: absolute;
          top: 0;
          left: 0;
        `}
        width="100%"
        height="100%"
        ref={registerPlayer}
        url={url}
        playing={isPlaying}
        muted={isMuted}
        volume={volume}
        controls
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPlay={onPlay}
        onProgress={onProgress}
        onDuration={onDuration}
        onPause={onPause}
        onBuffer={() => console.log('onBuffer')}
        onBufferEnd={() => console.log('onBufferEnd')}
        onSeek={e => console.log('onSeek', e)}
        onEnded={onEnded}
        onError={e => console.error('onError', e)}
      />
    </Wrapper>
  );
};

const mapState = (state: AppState) => {
  const { current: url, repeat, isPlaying, isMuted, volume } = state.player;
  return {
    url,
    repeat,
    isPlaying,
    isMuted,
    volume
  };
};
const mapDispatch = {
  play,
  pause,
  stop,
  progressUpdate,
  durationUpdate
  // setPlaybackRate
};
export default connect(
  mapState,
  mapDispatch
)(Player);
