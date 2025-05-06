import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import styles from './ListTopic.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Topic({ id, name, urlImageAlbum, songImages, aosDelay, isPlaylist }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        isPlaylist ? navigate(`/playlist/${id}`) : navigate(`/album/${id}`);
    };

    const renderImageContent = () => {
        if (songImages.length === 0) {
            return (
                <Image
                    src={images.albumDefault}
                    alt="Ảnh backup"
                    className={cx('single-image')}
                />
            );
        } else if (songImages.length >= 4) {
            return (
                <div className={cx('grid-image')}>
                    {songImages.slice(0, 4).map((img, index) => (
                        <Image key={index} src={img} alt={`img-${index}`} />
                    ))}
                </div>
            );
        } else {
            return (
                <Image
                    src={songImages[0]}
                    alt={name}
                    className={cx('single-image')}
                />
            );
        }
    };

    return (
        <div
            onClick={handleNavigate}
            className={cx('topic')}
            data-aos="fade-right"
            data-aos-delay={aosDelay}
        >
            <div className={cx('box-img')}>
                {songImages ? (
                    renderImageContent()
                ) : (
                    <Image
                        src={urlImageAlbum || images.albumDefault}
                        alt={name}
                    />
                )}

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
    urlImageAlbum: PropTypes.string,
    songImages: PropTypes.arrayOf(PropTypes.string),
    aosDelay: PropTypes.number,
};

export default Topic;
