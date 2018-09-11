import React, { Component } from 'react';

import ErrorBoundary from './ErrorBoundary';
import MovieListing from './movie-listing';

// @todo: remove
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ErrorBoundary>
          <MovieListing />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
