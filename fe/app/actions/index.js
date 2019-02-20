import ActionTypes from './action-types';

export const showModal = (name, config) => ({
  type: ActionTypes.SHOW_MODAL,
  payload: {
    name,
    config
  }
});

export const hideModal = name => ({
  type: ActionTypes.HIDE_MODAL,
  payload: { name }
});