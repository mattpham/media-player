import * as PlayerActionTypes from '../constants/player';
import { RepeatType } from '../reducers/player';

// TODO:
//  setPlaybackRate
//  next
//  back
// toggle pip?
// PlayerActionTypes

interface PlayAction {
  type: PlayerActionTypes.PLAY;
}

interface PauseAction {
  type: PlayerActionTypes.PAUSE;
}

interface TogglePlayAction {
  type: PlayerActionTypes.TOGGLE_PLAY;
}

interface StopAction {
  type: PlayerActionTypes.STOP;
}

interface SeekAction {
  type: PlayerActionTypes.SEEK;
  payload: {
    value: number;
  };
}

interface LoadAction {
  type: PlayerActionTypes.LOAD;
  payload: {
    src: string | null;
  };
}
interface NextAction {
  type: PlayerActionTypes.NEXT;
}
interface QueueAction {
  type: PlayerActionTypes.QUEUE;
  payload: {
    src: string;
  };
}

interface SetVolumeAction {
  type: PlayerActionTypes.SET_VOLUME;
  payload: {
    volume: number;
  };
}
interface SetPlaybackRateAction {
  type: PlayerActionTypes.SET_PLAYBACK_RATE;
  payload: {
    rate: number;
  };
}

interface ToggleMutedAction {
  type: PlayerActionTypes.TOGGLE_MUTED;
}

interface ToggleShuffleAction {
  type: PlayerActionTypes.TOGGLE_SHUFFLE;
}

interface SetRepeatAction {
  type: PlayerActionTypes.SET_REPEAT;
  payload: {
    repeat: RepeatType;
  };
}
interface PlayerUpdateAction {
  type: PlayerActionTypes.PLAYER_UPDATE;
  payload: {
    progress?: number;
    buffered?: number;
    duration?: number;
  };
}
export type PlayerActions =
  | PlayAction
  | PauseAction
  | TogglePlayAction
  | StopAction
  | SeekAction
  | LoadAction
  | SetVolumeAction
  | ToggleMutedAction
  | ToggleShuffleAction
  | SetRepeatAction
  | PlayerUpdateAction
  | SetPlaybackRateAction;

export const play = (): PlayAction => ({
  type: PlayerActionTypes.PLAY
});

export const togglePlay = (): TogglePlayAction => ({
  type: PlayerActionTypes.TOGGLE_PLAY
});

export const pause = (): PauseAction => ({
  type: PlayerActionTypes.PAUSE
});
export const next = (): NextAction => ({
  type: PlayerActionTypes.NEXT
});

export const stop = (): StopAction => ({
  type: PlayerActionTypes.STOP
});

export const seek = (value: number): SeekAction => ({
  type: PlayerActionTypes.SEEK,
  payload: {
    value
  }
});

export const load = (src: string): LoadAction => ({
  type: PlayerActionTypes.LOAD,
  payload: {
    src
  }
});

export const queue = (src: string): QueueAction => ({
  type: PlayerActionTypes.QUEUE,
  payload: {
    src
  }
});

export const setVolume = (volume: number): SetVolumeAction => ({
  type: PlayerActionTypes.SET_VOLUME,
  payload: {
    volume
  }
});

export const toggleMuted = (): ToggleMutedAction => ({
  type: PlayerActionTypes.TOGGLE_MUTED
});

export const toggleShuffle = (): ToggleShuffleAction => ({
  type: PlayerActionTypes.TOGGLE_SHUFFLE
});

export const setRepeat = (repeat: RepeatType): SetRepeatAction => ({
  type: PlayerActionTypes.SET_REPEAT,
  payload: {
    repeat
  }
});

export const setPlaybackRate = (rate: number): SetPlaybackRateAction => ({
  type: PlayerActionTypes.SET_PLAYBACK_RATE,
  payload: {
    rate
  }
});

export function playerUpdate(
  progress: number,
  buffered: number
): PlayerUpdateAction;
export function playerUpdate(duration: number): PlayerUpdateAction;
export function playerUpdate(
  progress?: number,
  buffered?: number,
  duration?: number
): PlayerUpdateAction {
  return {
    type: PlayerActionTypes.PLAYER_UPDATE,
    payload: {
      progress,
      buffered,
      duration
    }
  };
}
