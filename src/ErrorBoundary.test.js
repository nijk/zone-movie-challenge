import React from 'react';

// SuT
import ErrorBoundary from './ErrorBoundary';

const NaughtyChild = () => { throw new Error('foo') };
const GoodChild = () => 'foo';

describe('ErrorBoundary', () => {
  it('sets default state', () => {
    const wrapper = shallow(<ErrorBoundary />);
    expect(wrapper.state('hasError')).toEqual(false);
  });

  it('renders good children', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );
    expect(wrapper.find(GoodChild)).toHaveLength(1);
  });

  it('sets state on error', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <NaughtyChild />
      </ErrorBoundary>
    );
    expect(wrapper.state('hasError')).toEqual(true);
  });

  it('renders message on error', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <NaughtyChild />
      </ErrorBoundary>
    );
    expect(wrapper.text()).toEqual('Something went wrong.');
  });
});
