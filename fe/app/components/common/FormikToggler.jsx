import React from 'react';
import Switch from '@material-ui/core/Switch';
import Typeography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default ({
  field,
  label
}) =>
  <Grid>
    <Typeography>
      {label}
    </Typeography> 
    <Switch
      {...field}
      checked={field.value}
      color="primary"
    />
  </Grid>