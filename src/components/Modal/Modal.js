import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Modal({ isOpen, onClose, children, className }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div className={cx('modal-overlay')} onClick={handleOverlayClick}>
            <div className={cx('modal-content', className)}>
                <FontAwesomeIcon icon={faClose} className={cx('close-button')} onClick={onClose} />
                {children}
            </div>
        </div>
    );
}

export default Modal;

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
