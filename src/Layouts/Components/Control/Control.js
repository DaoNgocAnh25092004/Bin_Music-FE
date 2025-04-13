import classNames from 'classnames/bind';
import { useState, useMemo, useRef, useEffect, memo, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import styles from './Control.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faEllipsis,
    faMicrophoneLines,
    faRectangleList,
    faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import VolumeSlider from './Components/VolumeSlider/VolumeSlider';
import { setVolume } from '~/redux/slices/volumeSlice';
import { openLyric } from '~/redux/slices/lyricSlice';
import CentralControl from './Components/CentralControl';
import {
    finishHiding,
    hidePlayList,
    showPlayList,
} from '~/redux/slices/playlistSlice';

const cx = classNames.bind(styles);

function Control() {
    const { currentSong } = useSelector((state) => state.player, shallowEqual);
    const { volume } = useSelector((state) => state.volume, shallowEqual);
    const [valueVolume, setValueVolume] = useState(volume);
    const { isOpen } = useSelector((state) => state.playlist);

    const audioRef = useRef(null);
    const dispatch = useDispatch();

    const handleVolumeChange = useCallback(
        (e) => {
            const newVolume = e.target.value;
            setValueVolume(newVolume);
            dispatch(setVolume(newVolume));
            if (audioRef.current) {
                audioRef.current.volume = newVolume / 100;
            }
        },
        [dispatch],
    );

    const percentageVolume = useMemo(
        () => (valueVolume / 100) * 100,
        [valueVolume],
    );

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = valueVolume / 100;
        }
    }, [valueVolume]);

    const handleShowPlaylist = () => {
        if (isOpen) {
            dispatch(hidePlayList());
            setTimeout(() => {
                dispatch(finishHiding());
            }, 500);
        } else {
            dispatch(showPlayList());
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('box-left')}>
                <div className={cx('box-left-img')}>
                    <Image
                        src={currentSong?.thumbnailUrl}
                        alt={currentSong?.name}
                    />
                </div>
                <div className={cx('box-left-info')}>
                    <p>{currentSong?.name}</p>
                    <p>
                        {currentSong?.listArtist.map((artist, index) => (
                            <span key={index}>
                                {artist.name}
                                {index < currentSong.listArtist?.length - 1
                                    ? ', '
                                    : ''}
                            </span>
                        ))}
                    </p>
                </div>
                <div className={cx('box-left-control')}>
                    <div>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>

            <CentralControl audioRef={audioRef} />

            <div className={cx('box-right')}>
                <div>
                    <div onClick={() => dispatch(openLyric())}>
                        <FontAwesomeIcon icon={faMicrophoneLines} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faVolumeHigh} />
                        <VolumeSlider
                            value={valueVolume}
                            onChange={handleVolumeChange}
                            percentageVolume={percentageVolume}
                        />
                    </div>
                </div>

                <div
                    className={cx({ 'playlist-active': isOpen })}
                    onClick={handleShowPlaylist}
                >
                    <FontAwesomeIcon icon={faRectangleList} />
                </div>
            </div>
        </div>
    );
}

export default memo(Control);
