import classNames from 'classnames/bind';
import { useEffect, useState, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import PropTypes from 'prop-types';

import styles from './ListMusic.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faMicrophone,
    faPlay,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Music({
    music,
    handlePlaySong,
    isLyric,
    isHeart,
    handleAddPlaylist,
    isMore,
}) {
    const [duration, setDuration] = useState('00:00');
    const { currentSong, isPlaying } = useSelector(
        (state) => state.player,
        shallowEqual,
    );
    const checkPlaying = useMemo(
        () => currentSong?._id === music._id && isPlaying,
        [currentSong, isPlaying, music],
    );

    useEffect(() => {
        if (music.audioUrl) {
            const audio = new Audio(music.audioUrl);
            audio.addEventListener('loadedmetadata', () => {
                const minutes = Math.floor(audio.duration / 60);
                const seconds = Math.floor(audio.duration % 60);

                const formattedMinutes = minutes.toString().padStart(2, '0');
                const formattedSeconds = seconds.toString().padStart(2, '0');

                setDuration(`${formattedMinutes}:${formattedSeconds}`);
            });

            return () => {
                audio.removeEventListener('loadedmetadata', () => {});
            };
        }
    }, [music.audioUrl]);

    return (
        <div
            className={cx('music', { playing: checkPlaying })}
            onClick={() => handlePlaySong(music)}
        >
            <div className={cx('box-img')}>
                <Image src={music.thumbnailUrl} alt={music.name} />
            </div>
            <div className={cx('box-info')}>
                <div>
                    <p>{music.name}</p>
                    {music.premium && <span>PREMIUM</span>}
                </div>
                <p>
                    {music.listArtist.map((artist, index) => (
                        <span key={index}>
                            {artist.name}
                            {index < music.listArtist.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </p>
            </div>

            <div className={cx('time')}>{duration}</div>

            <div className={cx('control')}>
                {checkPlaying ? (
                    <Image
                        src={images.songPlaying}
                        className={cx('img-playing')}
                    />
                ) : (
                    <FontAwesomeIcon
                        className={cx('icon-play')}
                        icon={faPlay}
                    />
                )}

                <div>
                    {isLyric && (
                        <Tippy
                            content={'Lời bài hát'}
                            placement="top"
                            hideOnClick={false}
                        >
                            <div
                                className={cx('icon')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <FontAwesomeIcon icon={faMicrophone} />
                            </div>
                        </Tippy>
                    )}

                    {isHeart && (
                        <Tippy
                            content={'Thêm vào bài hát yêu thích'}
                            placement="top"
                            hideOnClick={false}
                        >
                            <div
                                className={cx('icon')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                        </Tippy>
                    )}

                    {isMore && (
                        <Tippy
                            content={'Tiện ích khác'}
                            placement="top"
                            hideOnClick={false}
                        >
                            <div
                                className={cx('icon')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </Tippy>
                    )}

                    {handleAddPlaylist && (
                        <Tippy
                            content={'Thêm vào playlist'}
                            placement="top"
                            hideOnClick={false}
                        >
                            <div
                                className={cx('icon')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddPlaylist();
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </Tippy>
                    )}
                </div>
            </div>
        </div>
    );
}

Music.propTypes = {
    music: PropTypes.object.isRequired,
    handlePlaySong: PropTypes.func.isRequired,
    handleAddPlaylist: PropTypes.func,
    isLyric: PropTypes.bool,
    isHeart: PropTypes.bool,
    isMore: PropTypes.bool,
};

export default Music;
