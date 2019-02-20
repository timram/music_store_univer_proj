import React from 'react';

const { Provider, Consumer } = React.createContext({});

export const ConfigProvider = Provider;
export const ConfigConsumer = Consumer;

export const withConfig = Component => props =>
  <Consumer>
    {config => <Component config={config} {...props}/>}
  </Consumer>