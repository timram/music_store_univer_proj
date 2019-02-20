import React from 'react';
import { compose } from 'recompose';
import { getAccount } from '../helpers/account';
import Dashboard from './dashboard';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PageLoader from './loaders/page-loader';
import { ConfigProvider } from '../providers/config';
import { ThemeProvider } from '../providers/theme';
import * as config from '../config';
import * as theme from '../theme';
import withValueLoading from '../helpers/withValueLoading';
import Modal from './modals/modal'

const styles = theme => ({
  paper: {
    display: 'block',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    padding: theme.spacing.unit * 2
  }
});

const enhancer = compose(
  withValueLoading({
    name: 'account',
    loaderComponent: PageLoader,
    useLoader: true,
    valueLoader: () => getAccount()
  }),
  withStyles(styles)
);
 
const Component = ({ classes, account }) =>
  <div id="app-root-container">
    <ThemeProvider value={theme}>
      <ConfigProvider value={config}>
        <Paper className={classes.paper}>
          <Modal/>
          <Dashboard account={account} />
        </Paper>
      </ConfigProvider>
    </ThemeProvider>
  </div>

export default enhancer(Component);