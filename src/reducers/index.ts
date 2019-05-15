import { combineReducers } from 'redux';
import player, { PlayerState } from './player';

export interface AppState {
  player: PlayerState;
}

export default combineReducers<AppState>({
  player
});
