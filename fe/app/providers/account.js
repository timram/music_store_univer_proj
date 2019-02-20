import React from 'react';
import { withRouter } from 'react-router-dom';
import { branch, compose, renderComponent } from 'recompose';
import { endpoints } from '../config';

const { Provider, Consumer } = React.createContext(null);

export const AccountProvider = Provider;
export const AccountConsumer = Consumer;

const withAccountContext = Component => props =>
  <Consumer>
    {account => <Component account={account} {...props}/>}
  </Consumer>;

export const withAccount = ({ redirect = false } = {}) => compose(
  withAccountContext,
  withRouter,
  branch(
    ({ account }) => !!redirect && !account,
    renderComponent(({ history }) => {
      history.push(endpoints.login);
      return null;
    })
  )
);