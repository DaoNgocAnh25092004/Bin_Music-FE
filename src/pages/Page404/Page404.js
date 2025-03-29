import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';

import styles from './Page404.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Page404() {
    const navigate = useNavigate();
    return (
        <>
            <div className={cx('container')}>
                <Image src={images.page404} alt="Page not found" />
            </div>
            <div className={cx('box-btn')}>
                <button className={cx('animated-button')} onClick={() => navigate(-1)}>
                    <svg viewBox="0 0 24 24" className={cx('arr-2')} xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                    </svg>
                    <span className={cx('text')}>Quay lại</span>
                    <span className={cx('circle')}></span>
                    <svg viewBox="0 0 24 24" className={cx('arr-1')} xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                    </svg>
                </button>
            </div>
        </>
    );
}

export default Page404;
