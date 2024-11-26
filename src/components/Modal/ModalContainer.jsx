import React from 'react';
import './ModalStyles.css';

const ModalContainer = ({ isOpen, title, children, onClose, footer }) => {
  return (
    <>
      {isOpen && <div className="modal-backdrop show" onClick={onClose}></div>}
      <div className={`modal-container ${isOpen ? 'show' : ''}`}>
        <div className="modal-header">
          {title}
          <button
            className="modal-close"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              float: 'right',
            }}
          >
            ✖
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </>
  );
};

export default ModalContainer;
