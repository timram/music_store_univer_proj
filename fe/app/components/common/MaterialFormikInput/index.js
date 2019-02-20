import {
  withState,
  compose,
  withProps,
  withPropsOnChange,
  mapProps,
} from 'recompose';
import Input from './Input';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  input: {
    marginTop: theme.spacing.unit * 3
  }
}); 
   
const FormikInput = compose(
  withState('localValue', 'setLocalValue', ({ field }) => field.value),

  withPropsOnChange(['changeOnBlur'], ({ changeOnBlur, field, setLocalValue }) => changeOnBlur
    ? {
      actions: {
        onChange: e => setLocalValue(e.target.value)
      }
    }
    : { actions: { ...field } }
  ),

  withProps(({ localValue, field, changeOnBlur, actions, onChange }) => changeOnBlur
    ? {
        value: localValue,
        actions: {
          ...actions,
          onBlur: () => onChange && onChange(localValue)
        }
      }
    : { value: field.value }
  ),

  mapProps(({
    changeOnBlur,
    localValue,
    setLocalValue,
    ...props
  }) => props),

  withStyles(styles)
)(Input);

FormikInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
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
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  changeOnBlur: PropTypes.bool
}; 

export default FormikInput; 