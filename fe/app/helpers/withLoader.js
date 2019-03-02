import React from 'react';

import {
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