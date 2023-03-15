import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleCloseByEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleCloseByEsc);
    return () => window.removeEventListener('keydown', handleCloseByEsc);
  }, [onClose]);

  const handleCloseByOverlay = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleCloseByOverlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
