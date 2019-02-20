import React from 'react';
import Typography from '@material-ui/core/Typography';

export default ({ children, tag = 'h1' }) =>
  <Typography
    component={tag}
    variant="display1"
  > 
    {children}
  </Typography> 