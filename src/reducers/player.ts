import produce from 'immer';
import * as PlayerActionTypes from '../constants/player';
import { PlayerActions } from '../actions/player';

export type RepeatType = 'NONE' | 'ALL' | 'ONE';

export interface PlayerState {
  shuffle: boolean;
  repeat: RepeatType;
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  buffered: number;
  duration: number;
  current: string | null;
  queue: string[];
  volume: number;
  playbackRate: number;
}

const initialState: PlayerState = {
  shuffle: false,
  repeat: 'NONE',
  isPlaying: false,
  isMuted: false,
  progress: 0,
  buffered: 0,
  duration: 0,
  current: null,
  queue: [],
  volume: 0,
  playbackRate: 1
};

const reducer = produce((draft: PlayerState, action: PlayerActions) => {
  switch (action.type) {
    case PlayerActionTypes.PLAY:
      draft.isPlaying = true;
      return;
    case PlayerActionTypes.PAUSE:
      draft.isPlaying = false;
      return;
    case PlayerActionTypes.TOGGLE_PLAY:
      draft.isPlaying = !draft.isPlaying;
      return;
    case PlayerActionTypes.TOGGLE_MUTED:
      draft.isMuted = !draft.isMuted;
      return;
    case PlayerActionTypes.STOP:
      draft.isPlaying = false;
      draft.current = null;
      draft.duration = 0;
      draft.progress = 0;
      draft.buffered = 0;
      return;
    case PlayerActionTypes.LOAD:
      draft.current = action.payload.src;
      draft.duration = 0;
      draft.progress = 0;
      draft.buffered = 0;
      return;
    case PlayerActionTypes.SET_REPEAT:
      draft.repeat = action.payload.repeat;
      return;
    case PlayerActionTypes.SET_VOLUME:
      draft.volume = action.payload.volume;
      return;
    case PlayerActionTypes.SEEK:
      draft.progress = action.payload.value;
      return;
    case PlayerActionTypes.PROGRESS_UPDATE:
      draft.progress = action.payload.progress;
      draft.buffered = action.payload.buffered;
      return;
    case PlayerActionTypes.DURATION_UPDATE:
      draft.duration = action.payload.duration;
      return;
    case PlayerActionTypes.SET_PLAYBACK_RATE:
      draft.playbackRate = action.payload.rate;
      return;
    default:
      return draft;
  }
}, initialState);

export default reducer;
