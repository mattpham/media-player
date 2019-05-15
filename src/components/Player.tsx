import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import Duration from './Duration';

import './reset.scss';
import './defaults.scss';
import './range.scss';
import './App.scss';
import { usePlayerRegistry } from '../middleware';
import { AppState } from '../reducers';
import {
  load,
  play,
  pause,
  togglePlay,
  stop,
  setRepeat,
  toggleMuted,
  setVolume,
  seek,
  playerUpdate,
  setPlaybackRate
} from '../actions/player';

const Input = (props: any) => (
  <input
    type="range"
    min={0}
    max={1}
    step="any"
    {...props}
    // value={value}
    // onChange={onChange}
    // onBlur={() => console.log('blurred')}
  />
);

const MULTIPLE_SOURCES = [
  {
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    type: 'video/mp4'
  },
  {
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv',
    type: 'video/ogv'
  },
  {
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm',
    type: 'video/webm'
  }
];

//  Temporary demo player
export const Player: React.FC<any> = ({
  isPlaying,
  isMuted,
  volume,
  url,
  duration,
  progress,
  buffered,
  repeat,
  load,
  play,
  pause,
  stop,
  togglePlay,
  toggleMuted,
  setRepeat,
  setVolume,
  seek,
  playerUpdate,
  setPlaybackRate
}) => {
  useEffect(() => {
    console.log('volume', volume);
  }, [volume]);
  // const [state, setState] = useState<IPlayerState>({
  //   url: null,
  //   pip: false,
  //   playing: true,
  //   volume: 0.8,
  //   muted: false,
  //   played: 0,
  //   loaded: 0,
  //   duration: 0,
  //   loop: false,
  //   seeking: false
  // });
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const playerRef = useRef<ReactPlayer | null>();
  // const getPlayerRef = useCallback(player => {
  //   registerPlayer(player)
  //   playerRef.current = player;
  // }, []);
  const registerPlayer = usePlayerRegistry<ReactPlayer>();

  const handleSetVolume = (e: any) => {
    e.persist();
    setVolume(parseFloat(e.target.value));
  };

  const onPlay = () => {
    console.log('onPlay');
    play();
  };

  const onPause = () => {
    console.log('onPause');
    pause();
  };

  const [{ isSeeking, seekTo }, setState] = useState({
    isSeeking: false,
    seekTo: 0
  });
  const onSeekMouseDown = (e: any) => {
    setState(state => ({ ...state, isSeeking: true, seekTo: progress }));
  };
  const onSeekChange = (e: any) => {
    e.persist();
    setState(state => ({ ...state, seekTo: parseFloat(e.target.value) }));
  };
  const onSeekMouseUp = (e: any) => {
    setState(state => ({ ...state, isSeeking: false }));
    seek(seekTo);
  };
  const onProgress = (e: any) => {
    console.log('onProgress', e);
    const { loaded, played } = e;
    // We only want to update time slider if we are not currently seeking
    // if (!state.seeking) {
    //   setState(state => ({ ...state, loaded, played }));
    // }
    playerUpdate(played, loaded);
  };
  const onEnded = () => {
    console.log('onEnded');
    stop();
  };
  const onDuration = (duration: any) => {
    console.log('onDuration', duration);
    playerUpdate(duration);
  };
  // const onClickFullscreen = () => {
  //   screenfull.request(findDOMNode(player));
  // };
  const renderLoadButton = (url: string, label: string) => {
    return <button onClick={() => load(url)}>{label}</button>;
  };

  // const {
  //   url,
  //   playing,
  //   volume,
  //   muted,
  //   loop,
  //   played,
  //   loaded,
  //   duration,
  //   seeking,
  //   pip
  // } = state;

  return (
    <div className="app">
      <section className="section">
        <h1>ReactPlayer Demo</h1>
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            width="100%"
            height="100%"
            ref={registerPlayer}
            // @ts-ignore
            url={url}
            // pip={pip}
            playing={isPlaying}
            muted={isMuted}
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
            // onEnablePIP={onEnablePIP}
            // onDisablePIP={onDisablePIP}
          />
        </div>

        <table>
          <tbody>
            <tr>
              <th>Controls</th>
              <td>
                <button onClick={stop}>Stop</button>
                <button onClick={togglePlay}>
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                {/* <button onClick={onClickFullscreen}>Fullscreen</button> */}
                {/* {url &&
                  typeof url === 'string' &&
                  ReactPlayer.canEnablePIP(url) && (
                    <button onClick={togglePIP}>
                      {pip ? 'Disable PiP' : 'Enable PiP'}
                    </button>
                  )} */}
              </td>
            </tr>
            <tr>
              <th>Speed</th>
              <td>
                <button
                  onClick={() => {
                    setPlaybackRate(1);
                  }}
                  value={1}
                >
                  1x
                </button>
                <button
                  onClick={() => {
                    setPlaybackRate(1.5);
                  }}
                  value={1.5}
                >
                  1.5x
                </button>
                <button
                  onClick={() => {
                    setPlaybackRate(2);
                  }}
                  value={2}
                >
                  2x
                </button>
              </td>
            </tr>
            <tr>
              <th>Seek</th>
              <td>
                <Input
                  value={isSeeking ? seekTo : progress}
                  onMouseDown={onSeekMouseDown}
                  onChange={onSeekChange}
                  onMouseUp={onSeekMouseUp}
                />
              </td>
            </tr>
            <tr>
              <th>Volume</th>
              <td>
                {/* <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  ref={volumeRef}
                  value={volume}
                  onChange={setVolume}
                  onBlur={() => console.log('blurred')}
                /> */}

                <Input value={volume} onChange={handleSetVolume} />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="muted">Muted</label>
              </th>
              <td>
                <input
                  id="muted"
                  type="checkbox"
                  checked={isMuted}
                  onChange={toggleMuted}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="loop">Loop</label>
              </th>
              <td>
                <button onClick={() => setRepeat('NONE')}>NONE</button>
                <button onClick={() => setRepeat('ONE')}>ONE</button>
                <button onClick={() => setRepeat('ALL')}>ALL</button>
              </td>
            </tr>
            <tr>
              <th>Played</th>
              <td>
                <progress max={1} value={progress} />
              </td>
            </tr>
            <tr>
              <th>Loaded</th>
              <td>
                <progress max={1} value={buffered} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="section">
        <table>
          <tbody>
            <tr>
              <th>YouTube</th>
              <td>
                {renderLoadButton(
                  'https://www.youtube.com/watch?v=oUFJJNQGwhk',
                  'Test A'
                )}
                {renderLoadButton(
                  'https://www.youtube.com/watch?v=jNgP6d9HraI',
                  'Test B'
                )}
                {renderLoadButton(
                  'https://www.youtube.com/playlist?list=PLDEcUiPhzbjI217qs5KgMvbvx6-fgY_Al',
                  'Playlist'
                )}
              </td>
            </tr>
            <tr>
              <th>SoundCloud</th>
              <td>
                {renderLoadButton(
                  'https://soundcloud.com/miami-nights-1984/accelerated',
                  'Test A'
                )}
                {renderLoadButton(
                  'https://soundcloud.com/tycho/tycho-awake',
                  'Test B'
                )}
              </td>
            </tr>
            <tr>
              <th>Facebook</th>
              <td>
                {renderLoadButton(
                  'https://www.facebook.com/facebook/videos/10153231379946729/',
                  'Test A'
                )}
                {renderLoadButton(
                  'https://www.facebook.com/FacebookDevelopers/videos/10152454700553553/',
                  'Test B'
                )}
              </td>
            </tr>
            <tr>
              <th>Vimeo</th>
              <td>
                {renderLoadButton('https://vimeo.com/90509568', 'Test A')}
                {renderLoadButton('https://vimeo.com/169599296', 'Test B')}
              </td>
            </tr>
            <tr>
              <th>Twitch</th>
              <td>
                {renderLoadButton(
                  'https://www.twitch.tv/videos/106400740',
                  'Test A'
                )}
                {renderLoadButton(
                  'https://www.twitch.tv/videos/12783852',
                  'Test B'
                )}
                {renderLoadButton('https://www.twitch.tv/kronovi', 'Test C')}
              </td>
            </tr>
            <tr>
              <th>Streamable</th>
              <td>
                {renderLoadButton('https://streamable.com/moo', 'Test A')}
                {renderLoadButton('https://streamable.com/ifjh', 'Test B')}
              </td>
            </tr>
            <tr>
              <th>Wistia</th>
              <td>
                {renderLoadButton(
                  'https://home.wistia.com/medias/e4a27b971d',
                  'Test A'
                )}
                {renderLoadButton(
                  'https://home.wistia.com/medias/29b0fbf547',
                  'Test B'
                )}
              </td>
            </tr>
            <tr>
              <th>DailyMotion</th>
              <td>
                {renderLoadButton(
                  'https://www.dailymotion.com/video/x5e9eog',
                  'Test A'
                )}
                {renderLoadButton(
                  'https://www.dailymotion.com/video/x61xx3z',
                  'Test B'
                )}
              </td>
            </tr>
            <tr>
              <th>Mixcloud</th>
              <td>
                {renderLoadButton(
                  'https://www.mixcloud.com/mixcloud/meet-the-curators/',
                  'Test A'
                )}
                {renderLoadButton(
                  'https://www.mixcloud.com/mixcloud/mixcloud-curates-4-mary-anne-hobbs-in-conversation-with-dan-deacon/',
                  'Test B'
                )}
              </td>
            </tr>
            <tr>
              <th>Files</th>
              <td>
                {renderLoadButton(
                  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                  'mp4'
                )}
                {renderLoadButton(
                  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv',
                  'ogv'
                )}
                {renderLoadButton(
                  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm',
                  'webm'
                )}
                {renderLoadButton(
                  'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
                  'mp3'
                )}
                {MULTIPLE_SOURCES.map((s, id) => (
                  <div key={id}>{renderLoadButton(s.src, s.type)}</div>
                ))}
                {renderLoadButton(
                  'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
                  'HLS (m3u8)'
                )}
                {renderLoadButton(
                  'http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd',
                  'DASH (mpd)'
                )}
              </td>
            </tr>
            <tr>
              <th>Custom URL</th>
              <td>
                <input ref={inputRef} type="text" placeholder="Enter URL" />
                <button
                  onClick={() =>
                    setState(state => ({
                      ...state,
                      url:
                        inputRef && inputRef.current && inputRef.current.value
                    }))
                  }
                >
                  Load
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>State</h2>

        <table>
          <tbody>
            <tr>
              <th>url</th>
              <td className={!url ? 'faded' : ''}>
                {(url instanceof Array ? 'Multiple' : url) || 'null'}
              </td>
            </tr>
            <tr>
              <th>playing</th>
              <td>{isPlaying ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>seeking</th>
              <td>{isSeeking ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>muted</th>
              <td>{isMuted ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>loop</th>
              <td>{repeat}</td>
            </tr>
            <tr>
              <th>volume</th>
              <td>{volume.toFixed(3)}</td>
            </tr>
            <tr>
              <th>played</th>
              <td>{progress.toFixed(3)}</td>
            </tr>
            <tr>
              <th>loaded</th>
              <td>{buffered.toFixed(3)}</td>
            </tr>
            <tr>
              <th>duration</th>
              <td>
                <Duration seconds={duration} />
              </td>
            </tr>
            <tr>
              <th>elapsed</th>
              <td>
                <Duration seconds={duration * progress} />
              </td>
            </tr>
            <tr>
              <th>remaining</th>
              <td>
                <Duration seconds={duration * (1 - progress)} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

const mapState = (state: AppState) => {
  const {
    current,
    duration,
    progress,
    buffered,
    repeat,
    isPlaying,
    isMuted,
    volume
  } = state.player;
  return {
    url: current,
    duration,
    progress,
    buffered,
    repeat,
    isPlaying,
    isMuted,
    volume
  };
};
const mapDispatch = {
  load,
  play,
  pause,
  stop,
  togglePlay,
  setRepeat,
  toggleMuted,
  setVolume,
  seek,
  playerUpdate,
  setPlaybackRate
};
export default connect(
  mapState,
  mapDispatch
)(Player);
