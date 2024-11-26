import React from 'react';
import ModalContainer from './ModalContainer';

const DetailModal = ({ isOpen, onClose, details }) => {
  return (
    <ModalContainer isOpen={isOpen} title="Details" onClose={onClose}>
      <p>{details}</p>
    </ModalContainer>
  );
};

export default DetailModal;
