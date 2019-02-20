import ActionTypes from '../actions/action-types';

const initialModalState = {}

export const modalReducer = (state = initialModalState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SHOW_MODAL:
      return {
        ...state,
        [payload.name]: payload.config
      };

    case ActionTypes.HIDE_MODAL:
      return Object.keys(state)
        .reduce((acc, key) =>
          key !== payload.name
            ? { ...acc, [key]: state[key] }
            : acc
          , {});
  
    default:
      return state;
  }
}