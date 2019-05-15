import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { playerMiddleware } from '../middleware';
import reducers from '../reducers';

const store = (preloadedState?: any) => createStore(
  reducers,
  preloadedState,
  composeWithDevTools(
    applyMiddleware(playerMiddleware)
    // other store enhancers if any
  )
);

export default store;
