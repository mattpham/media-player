import React from 'react';
import { connect } from 'react-redux';
import { GlobalStyle } from './GlobalStyle';
import  Player from './components/Player';
import { play, pause } from './actions/player';

const App: React.FC<{
  play: () => void;
  pause: () => void;
}> = ({ play, pause }) => {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <div>
          <button onClick={play}>Play</button>
          <button onClick={pause}>Pause</button>
        </div>
        <Player />
      </div>
    </>
  );
};

export default connect(
  null,
  { play, pause }
)(App);
