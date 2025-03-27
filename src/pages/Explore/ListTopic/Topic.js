import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import styles from './ListTopic.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Topic({ id, name, urlImageAlbum }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/album/${id}`);
    };

    return (
        <div onClick={handleNavigate} className={cx('topic')}>
            <div className={cx('box-img')}>
                <Image src={urlImageAlbum} alt={name} />
                <div className={cx('control-img')}>
                    <FontAwesomeIcon icon={faHeart} />
                    <FontAwesomeIcon
                        className={cx('icon-play')}
                        icon={faCirclePlay}
                    />
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </div>
            <p className={cx('title')}>{name}</p>
        </div>
    );
}

Topic.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    urlImageAlbum: PropTypes.string.isRequired,
};

export default Topic;
