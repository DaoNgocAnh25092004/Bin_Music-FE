import classNames from 'classnames/bind';

import styles from './ListMusic.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Music() {
    return (
        <div className={cx('music')}>
            <div className={cx('box-img')}>
                <Image src={images.music} alt="Nhạc" />
            </div>
            <div className={cx('box-info')}>
                <div>
                    <p>Nếu ngày ấy ta còn ở lại bên nhau để nói cho nhau</p>
                    <span>PREMIUM</span>
                </div>
                <p>Trịnh Thăng Bình, Đào Ngọc Anh ATP, HIEUTHUHAI</p>
            </div>

            <div className={cx('control')}>
                <FontAwesomeIcon className={cx('icon-play')} icon={faPlay} />
                <div>
                    <FontAwesomeIcon icon={faHeart} />
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </div>
        </div>
    );
}

export default Music;
