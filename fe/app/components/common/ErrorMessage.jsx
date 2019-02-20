import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit
  }
}); 

const ErrorMessage = withStyles(styles)(
  ({ msg, classes, ...props }) =>
    <Chip
      className={classes.chip}
      label={msg}
      color="secondary"
      {...props}
    />
);

ErrorMessage.propTypes = {
  msg: PropTypes.string.isRequired
};

export default ErrorMessage;