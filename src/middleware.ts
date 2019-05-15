import { useCallback } from 'react';
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import * as PlayerActionTypes from './constants/player';

// Holds a reference to a media player instance.
let player: any = null;

/*
 * Wrapper hook function around `useCallback` used to register a Media Player
 * component instance.
 *
 * NOTE: only references the last registered player.
 */
export function usePlayerRegistry<T>(): (node: T) => void {
  const callback = useCallback(node => {
    player = node;
  }, []);

  return callback;
}

/*
 * Redux middleware used to make imperative method calls on the registered
 * player instance.
 */
export const playerMiddleware: Middleware = (store: MiddlewareAPI) => (
  next: Dispatch
) => (action: AnyAction) => {
  switch (action.type) {
    case PlayerActionTypes.SEEK:
      player.seekTo(action.payload.seek);
      break;
    default:
      break;
  }

  next(action);
};
