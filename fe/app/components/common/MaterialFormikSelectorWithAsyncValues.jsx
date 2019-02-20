import React from 'react';
import { compose, lifecycle, branch, renderComponent, withStateHandlers, withHandlers } from 'recompose';
import FormikSelector from './MaterialFormikSelector';
import PropTypes from 'prop-types';
import ValueCreator from '../common/ValueCreator';
import ErrorMessage from '../common/ErrorMessage';
import withLoader from '../../helpers/withLoader';
import ElementLoader from '../loaders/element-loader';
import { general } from '../../theme';
import withModal from '../../helpers/containers/withModal';
import ModalTypes from '../modals/modal-types';

const enhancer = compose(
  withModal(),
  withStateHandlers(
    {
      loaded: false,
      values: [],
      error: ''
    },
    {
      setLoaded: state => loaded => ({ ...state, loaded }),
      setValues: () => values => ({
        values,
        loaded: true,
        error: ''
      }),
      setError: state => error => ({ ...state, error, loaded: true })
    }
  ),

  withHandlers({
    loadValues: ({ valuesLoader, valuesMapper, setValues, setLoaded }) => async () => {
      setLoaded(false);
      const values = await valuesLoader();
      return setValues(valuesMapper(values));
    },

    deleteValue: ({
      setValues,
      valueDeleter,
      valuesMapper,
      onReset,
      field,
      label,
      showModal,
      values
    }) => async value => {
      const { label: deletedLabel } = values.find(v => v.value === value);
      showModal(ModalTypes.DIALOG, {
        title: `Удалить ${label} "${deletedLabel}" ?`,
        onApprove: async () => {
          const updValues = await valueDeleter(value);
          field.value === value && onReset && onReset(value);
          return setValues(valuesMapper(updValues));
        }
      });
    },

    addValue: ({ onChange, setValues, valuesMapper, valueCreator, setError, label }) => async value => {
      const updValues = await valueCreator(value);
      if (!updValues) {
        return setError(`Такой ${label} уже существует`);
      }
      const mappedValues = valuesMapper(updValues);
      const newVal = mappedValues.find(({ label }) => label === value);
      newVal && onChange(newVal.value);
      return setValues(mappedValues);
    }
  }),

  lifecycle({
    componentDidMount() {
      return this.props.loadValues();
    }
  }),

  withLoader({ loaderComponent: ElementLoader })
);

const Component = ({ ...props, addValue, error, setError }) =>
  <div className={general.form.item}>
    <FormikSelector {...props}/>
    <ValueCreator
      display-if={!!props.valueCreator}
      onChange={() => setError('')}
      onSubmit={addValue}
      label={props.label}
    />
    <ErrorMessage
      display-if={error.length > 0}
      msg={error}
    />
  </div>

const SelectorWithValues = enhancer(Component);

SelectorWithValues.propTypes = {
  valuesLoader: PropTypes.func.isRequired,
  valuesMapper: PropTypes.func.isRequired,
  valueCreator: PropTypes.func,
  valueDeleter: PropTypes.func,
  onReset: PropTypes.func
};

export default SelectorWithValues;