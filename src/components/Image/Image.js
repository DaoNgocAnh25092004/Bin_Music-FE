import { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Image.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Image = forwardRef(
    (
        {
            src,
            alt,
            className,
            fallBack: customFallBack = images.noImage,
            ...props
        },
        ref,
    ) => {
        const [fallBackSrc, setFallBackSrc] = useState('');

        const handleImageError = () => {
            setFallBackSrc(customFallBack);
        };

        return (
            <img
                className={cx('wrapper', className)}
                ref={ref}
                src={fallBackSrc || src}
                alt={alt}
                {...props}
                onError={handleImageError}
            />
        );
    },
);

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};

export default Image;
