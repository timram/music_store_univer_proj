import { createElement } from 'react';

export default Component => props => {
  const { setValues, setTouched, values, touched } = props;
  const methods = {
    updateValue: ({ name }) => value => {
      return setValues({
        ...values,
        [name]: value
      });
    },
    touchElement: ({ name }) => () =>
      !touched[name] && setTouched({
        ...touched,
        [name]: true
      }),
    resetValue: ({ name, val }) => () => setValues({
      ...values,
      [name]: val
    }) 
  };
  return createElement(Component, {
    ...props,
    ...methods
  });
}