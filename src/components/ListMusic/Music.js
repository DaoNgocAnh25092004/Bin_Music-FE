import classNames from 'classnames/bind';
import { useEffect, useState, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import styles from './ListMusic.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faMicrophone,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Music({ music, handlePlaySong }) {
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
                    <FontAwesomeIcon icon={faMicrophone} />
                    <FontAwesomeIcon icon={faHeart} />
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </div>
        </div>
    );
}

export default Music;
