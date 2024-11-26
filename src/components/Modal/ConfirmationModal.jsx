import React from 'react';
import ModalContainer from './ModalContainer';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <ModalContainer
      isOpen={isOpen}
      title="Confirm Action"
      onClose={onCancel}
      footer={
        <>
          <button className="modal-button cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-button confirm" onClick={onConfirm}>
            Confirm
          </button>
        </>
      }
    >
      Are you sure you want to proceed with this action?
    </ModalContainer>
  );
};

export default ConfirmationModal;
