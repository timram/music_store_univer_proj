import React from 'react';

import {
  compose,
  withProps,
  branch,
  renderComponent
} from 'recompose';

export default config => branch(
  ({ loaded }) => !loaded,
  renderComponent(props => {
    const Loader = typeof config === 'function'
      ? config(props).loaderComponent
      : config.loaderComponent
    return <Loader/>;
  })
); 