import React from 'react';

const { Provider, Consumer } = React.createContext({});

export const ThemeProvider = Provider;
export const ThemeConsumer = Consumer;

export const withTheme = Component => props =>
  <Consumer>
    {theme => <Component theme={theme} {...props}/>}
  </Consumer>