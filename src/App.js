import React, { Component } from 'react';
import styled from 'styled-components';

import ErrorBoundary from './ErrorBoundary';
import MovieListing from './movie-listing';

import './App.styles';
import { colours } from './styles';

const Wrapper = styled.div`
`;

const Header = styled.header`
  background-color: ${colours.darkGrey};
  color: ${colours.white};
  margin: 0 0 2rem;
  padding: 2rem;
`;

const Main = styled.main`
  margin: 0 auto;
  max-width: 1600px;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          Header
        </Header>
        <Main>
          <ErrorBoundary>
            <MovieListing />
          </ErrorBoundary>
        </Main>
      </Wrapper>
    );
  }
}

export default App;
