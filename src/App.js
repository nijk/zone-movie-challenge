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
Wrapper.displayName = 'Wrapper';

const Header = styled.header`
  align-items: center;
  background-color: ${colours.darkGrey};
  color: ${colours.white};
  display: flex;
  justify-content: space-between;
  margin: 0 0 2rem;
  padding: 2rem 2rem 1.5rem;
`;
Header.displayName = 'Header';

const LogoImg = styled.img`
  height: 40px;
`;

const AppTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 1;
  margin: 0;
  padding: 0;
`;

const Main = styled.main`
  height: 100%;
  margin: 0 auto;
  max-width: 1600px;
`;
Main.displayName = 'Main';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <LogoImg alt="Zone Digital" src={Logo} />
          <AppTitle>Zone Movie Challenge</AppTitle>
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
