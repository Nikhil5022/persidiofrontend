import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

function Modal({ isOpen, onClose, children }) {
  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal"
      unmountOnExit
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 z-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
          <button 
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 text-3xl" 
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
}

export default Modal;
