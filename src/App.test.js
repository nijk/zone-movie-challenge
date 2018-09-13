import React from 'react';

// SuT
import App from './App';

describe('App', () => {
  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Wrapper')).toHaveLength(1);
  });

  it('renders Header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('renders Main', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Main')).toHaveLength(1);
  });

  it('wraps MovieListing in an ErrorBoundary', () => {
    const wrapper = shallow(<App />);
    const MovieListing = wrapper.find('MovieListing');
    const ErrorBoundary = MovieListing.parent();
    expect(MovieListing).toHaveLength(1);
    expect(ErrorBoundary).toHaveLength(1);
  });
});
