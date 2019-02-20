import React from 'react';

import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { endpoints } from '../../config';
import LoginForm from '../login-form';
import Navigation from '../navigation';
import { AccountProvider } from '../../providers/account';
 
export default ({ account, setAccount, routes }) =>
<BrowserRouter>
  <Grid
    container
    spacing={16}
  >
    <Grid display-if={!!account} item xs={2}>
      <Navigation/>
    </Grid>
    <Grid item xs={!!account ? 10 : 12}>
      <AccountProvider value={account}>
        <Route
          path={endpoints.login}
          render={() => <LoginForm setAccount={setAccount}/>}
        /> 
        {routes.map((r, i) => <Route key={i} {...r}/>)}
      </AccountProvider>
    </Grid>
  </Grid>
</BrowserRouter>;