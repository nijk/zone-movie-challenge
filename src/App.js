import React, { Component } from 'react';
import styled from 'styled-components';

import ErrorBoundary from './ErrorBoundary';
import MovieListing from './movie-listing';
import Logo from './logo.svg';

import './App.styles';
import { colours } from './styles';

const Wrapper = styled.div`
  height: 100%;
`;

const Header = styled.header`
  background-color: ${colours.darkGrey};
  color: ${colours.white};
  margin: 0 0 2rem;
  padding: 2rem 2rem 1.5rem;
`;

const LogoImg = styled.img`
  width: 140px;
`;

const Main = styled.main`
  height: 100%;
  margin: 0 auto;
  max-width: 1600px;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <LogoImg alt="Zone Digital" src={Logo} />
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
