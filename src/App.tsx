import React from 'react';
import styled from 'styled-components/macro';
import { GlobalStyle } from './GlobalStyle';
import Player from './components/Player';
import PlayerBar from './components/PlayerBar';
import Debug from './components/Debug';

const Section = styled.section``;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <div
        className="App"
        css={`
          display: grid;
          grid-template-columns: 1fr 300px;
        `}
      >
        <section css={``}>
          <div
            css={`
              // width: 480px;
              // height: 270px;
            `}
          >
            <Player />
            <PlayerBar />
          </div>
        </section>
        <section
          css={`
            grid-row-start: 2;
          `}
        >
          <Debug />
        </section>
      </div>
    </>
  );
};

export default App;
