import { connect } from 'react-redux';
import { showModal, hideModal } from '../../actions';

export default useState => BaseComponent => connect(
  ({ modalReducer }) => useState
    ? modalReducer
    : {},
  dispatch => ({
    hideModal: name => dispatch(hideModal(name)),
    showModal: (name, config) => dispatch(showModal(name, config || true))
  })
)(BaseComponent);