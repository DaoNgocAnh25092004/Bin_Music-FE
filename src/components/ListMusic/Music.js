import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './ListMusic.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faMicrophone,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Music({ music, handlePlaySong }) {
    const [duration, setDuration] = useState('00:00');

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
        <div className={cx('music')} onClick={() => handlePlaySong(music)}>
            <div className={cx('box-img')}>
                <Image src={music.thumbnailUrl} alt="Nhạc" />
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
                <FontAwesomeIcon className={cx('icon-play')} icon={faPlay} />
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
