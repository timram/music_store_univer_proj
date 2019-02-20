import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

export default () =>
  <Grid
    container
    alignItems="center"
    justify="center"
  >
    <CircularProgress
      size={50}
    />
  </Grid>