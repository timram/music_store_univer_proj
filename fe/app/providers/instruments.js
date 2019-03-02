import React from 'react';

const { Provider, Consumer } = React.createContext(null);

export const InstrumentsProvider = Provider;
export const InstrumentsConsumer = Consumer;

export const withInstruments = Component => props =>
  <Consumer>
    {instruments => <Component instruments={instruments} {...props}/>}
  </Consumer>;