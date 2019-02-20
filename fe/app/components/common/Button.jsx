import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
}) 

const MyButton = withStyles(styles)(
  ({ children, classes, ...props }) =>
    <Button
      variant="contained"
      className={classes.button}
      {...props}
    >
      {children}
    </Button>
);

export default MyButton;