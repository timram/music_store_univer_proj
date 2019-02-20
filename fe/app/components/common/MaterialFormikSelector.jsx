import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FromHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton';
import { cleanEvent } from '../../helpers/utils';

const styles =  theme => ({
  root: {
    width: '100%'
  }
});

const FormSelector = ({
  field,
  form,
  label,
  description,
  margin="normal",
  variant="outlined",
  onChange,
  onClick,
  values,
  required=false,
  deleteable,
  classes,
  deleteValue,
  ...props
}) =>
  <FormControl
    variant={variant}
    error={form.errors[field.name] && form.touched[field.name]}
    className={classes.root}
  >  
    <InputLabel htmlFor={field.name}>
      {label || field.name}
    </InputLabel>
    <Select
      inputProps={{
        name: field.name,
        id: field.id,
        required
      }}
      value={field.value}
      onChange={e => onChange(e.target.value)}
      onClick={e => onClick && onClick(e)}
      autoWidth={true}
    >
      {values.map((v, i) => 
        <MenuItem key={i} value={v.value}>
          {v.label}
          <IconButton
            display-if={deleteable && v.deleteable}
            onClick={cleanEvent(() => deleteValue && deleteValue(v.value))}
          >
            <DeleteIcon/>
          </IconButton>
        </MenuItem>
      )}
    </Select>
    <FromHelperText
      display-if={!!form.errors[field.name] || !!description}
    >
      {(form.touched[field.name] && form.errors[field.name]) || description}
    </FromHelperText>
  </FormControl>;


FormSelector.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  form: PropTypes.shape({
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired
  }).isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  onChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.any.isRequired,
    deleteable: PropTypes.bool
  })),
  onClick: PropTypes.func,
  deleteable: PropTypes.bool,
  deleteValue: PropTypes.func
}

export default withStyles(styles)(FormSelector);