import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    height: '100vh'
  }
});

export default withStyles(styles)(
({ classes }) =>
  <Grid
    className={classes.root}
    container
    alignItems="center"
    justify="center"
  >
    <CircularProgress
      size={100}
    />
  </Grid>
);