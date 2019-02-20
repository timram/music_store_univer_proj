import {
  compose,
  withStateHandlers,
  lifecycle,
  branch,
  withProps,
  withHandlers
} from 'recompose';
import withLoader from './withLoader';

export default loaderProps => compose(
  withProps(props => {
    const {
      name,
      loaderComponent,
      useLoader,
      valueLoader
    } = typeof loaderProps === 'function'
      ? loaderProps(props)
      : loaderProps;
    return {
      name, loaderComponent, useLoader, valueLoader
    } 
  }),

  withStateHandlers(
    ({ name }) => ({
      loaded: false,
      [name]: null
    }),
    {
      setValue: () => (value, name) => ({
        loaded: true,
        [name]: value
      }),
      setLoaded: state => loaded => ({ ...state, loaded })
    }
  ),

  withHandlers(({ name }) => ({
    [`set${name[0].toUpperCase() + name.slice(1)}`]: ({ setValue }) => value => setValue(value, name)
  })),

  lifecycle({
    async componentDidMount() {
      const { name, valueLoader } = this.props;
      const setterName = `set${name[0].toUpperCase() + name.slice(1)}`;
      const value = await valueLoader(this.props);
      return this.props[setterName](value);
    }
  }),

  branch(
    ({ useLoader }) => useLoader,
    withLoader(({ loaderComponent }) => ({ loaderComponent }))
  )
);