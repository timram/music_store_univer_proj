import React from 'react';
import TextField from '@material-ui/core/TextField'; 

export default ({
  field,
  form,
  label,
  description, 
  required = false,
  margin="normal", 
  variant="outlined",
  value,
  classes,
  onFocus,
  actions,
  ...props
}) => {
  return <TextField
    {...props}
    {...actions} 
    onFocus={() => onFocus && onFocus(value)}
    value={value}
    error={form.errors[field.name] && form.touched[field.name]}
    required={required}
    name={field.name}
    label={label || field.name}
    helperText={(form.touched[field.name] && form.errors[field.name]) || description || null}
    margin={margin}
    variant={variant}
    fullWidth
    className={classes.input}
  />;
}
