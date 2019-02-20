import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStateHandlers } from 'recompose';
import PropTypes from 'prop-types';
import CommonButton from './Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: 0
  },
  buttonWrapper: {
    padding: theme.spacing.unit,
    paddingBottom: 0
  },
  inputWrapper: {
    padding: 0,
    marginBottom: theme.spacing.unit * 2
  }
});

const enhancer = withStateHandlers(
  {
    showInput: false,
    value: ''
  },
  {
    setShowInput: state => showInput => ({ ...state, showInput }),
    setValue: state => value => ({ ...state, value })
  }
);

const ValueCreator = enhancer(
  ({
    showInput,
    value,
    setShowInput,
    setValue,
    onSubmit,
    onChange,
    label,
    classes
  }) =>
    <Grid
      container
      spacing={16}  
      direction="column"
      className={classes.root}
    >
      <Grid className={classes.buttonWrapper}>
        <Button 
          onClick={() => {
            setShowInput(!showInput);
            onChange(value);
          }}
        >
          {`Добавить ${label ? label : ''} ${showInput ? '-' : '+'}`}
        </Button>
      </Grid> 
      <Grid
        display-if={showInput}
        className={classes.inputWrapper}
      >
        <TextField
          value={value}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          variant="outlined"
        />
        <CommonButton
          onClick={() => value.length > 0 && onSubmit(value)}
        >
          Добавить
        </CommonButton>
      </Grid>
    </Grid>
);

ValueCreator.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default withStyles(styles)(ValueCreator);