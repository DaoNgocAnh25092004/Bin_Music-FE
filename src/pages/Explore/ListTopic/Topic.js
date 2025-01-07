import classNames from 'classnames/bind';

import styles from './ListTopic.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Topic() {
    return (
        <div className={cx('topic')}>
            <div className={cx('box-img')}>
                <Image src={images.music} alt="Nhạc" />
                <div className={cx('control-img')}>
                    <FontAwesomeIcon icon={faHeart} />
                    <FontAwesomeIcon className={cx('icon-play')} icon={faCirclePlay} />
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </div>
            <p className={cx('title')}>Những ca khúc ballad cực thẩm mà bạn không thể nào bỏ lỡ đâu nha các bạn ơi</p>
        </div>
    );
}

export default Topic;
