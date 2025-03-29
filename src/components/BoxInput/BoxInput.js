import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { memo } from 'react';

import styles from './BoxInput.module.scss';

const cx = classNames.bind(styles);

const BoxInput = forwardRef(
    (
        {
            label,
            type = 'text',
            name,
            value,
            onChange,
            placeholder,
            error,
            icon,
            classBox,
            onFocus,
        },
        ref,
    ) => {
        return (
            <div className={cx('box-input', { classBox })}>
                <div>{label}</div>
                <div>
                    <input
                        ref={ref}
                        className={cx('input', { 'input-error': error })}
                        placeholder={placeholder}
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                    />
                    {icon}
                    {error && <p className={cx('error')}>{error}</p>}
                </div>
            </div>
        );
    },
);

BoxInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.object,
    classBox: PropTypes.string,
};

export default memo(BoxInput);
