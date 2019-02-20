import ReactDOM from 'react-dom';
import React from 'react';
import BaseComponent from './components';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
import style from './style.scss';

const store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <BaseComponent/>
  </Provider>,
  document.getElementById('app')
);