import React from 'react';
import withModal from '../../helpers/containers/withModal';
import { modal } from '../../theme';
import ModalTypes from './modal-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withState } from 'recompose';

const enhancer = withState('open', 'setOpen', true);

const DialogModal = enhancer(({ hideModal, title, open, setOpen, onApprove }) =>
<Dialog
  open={open}
  onClose={() => hideModal(ModalTypes.DIALOG)}
>
  <DialogTitle>{title}</DialogTitle>
  <DialogActions>
    <Button
      color="primary"
      onClick={async () => {
        await onApprove();
        setOpen(false);
        hideModal(ModalTypes.DIALOG);
      }}
    >
      ДА
    </Button>
    <Button
      color="secondary"
      onClick={() => {
        setOpen(false);
        hideModal(ModalTypes.DIALOG);
      }}
    >
      НЕТ
    </Button>
  </DialogActions>
</Dialog>
);

const InfoModal = enhancer(({ open, setOpen, hideModal, title }) =>
  <Dialog
    open={open}
    onClose={() => hideModal(ModalTypes.INFO_MODAL)}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogActions>
      <Button
        color="primary"
        onClick={() => {
          setOpen(false);
          hideModal(ModalTypes.INFO_MODAL);
        }}
      >
        OK
      </Button>
    </DialogActions>
  </Dialog>
);
  

export default withModal(true)(({
  showModal,
  hideModal,
  ...props
}) => {
  if (props[ModalTypes.DIALOG]) {
    return <DialogModal
      showModal={showModal}
      hideModal={hideModal}
      {...props[ModalTypes.DIALOG]}
    />
  }

  if (props[ModalTypes.INFO_MODAL]) {
    return <InfoModal
      hideModal={hideModal}
      {...props[ModalTypes.INFO_MODAL]}
    />;
  }
  return null;
});