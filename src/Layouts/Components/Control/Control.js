import classNames from 'classnames/bind';
import { useState, useMemo, useRef, useEffect, memo, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
    nextSong,
    playPause,
    prevSong,
    toggleRepeat,
    toggleShuffle,
    updateCurrentTime,
    updateTimeSong,
} from '~/redux/slices/playerSlice';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Control.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faCirclePause,
    faEllipsis,
    faForwardStep,
    faMicrophoneLines,
    faRectangleList,
    faRepeat,
    faShuffle,
    faVolumeHigh,
    faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';
import VolumeSlider from './Components/VolumeSlider/VolumeSlider';
import { setVolume } from '~/redux/slices/volumeSlice';

const cx = classNames.bind(styles);

function Control() {
    const {
        currentSong,
        isPlaying,
        currentTimeSong,
        timeSong,
        isShuffle,
        isRepeat,
    } = useSelector((state) => state.player, shallowEqual);
    const { volume } = useSelector((state) => state.volume, shallowEqual);

    const [valueVolume, setValueVolume] = useState(volume);
    const [currentTime, setCurrentTime] = useState(currentTimeSong);
    const audioRef = useRef(null);
    const dispatch = useDispatch();

    //------------------------- Handle Center ----------------------------------

    // Handle when input time music change
    const handleTogglePlay = () => {
        if (audioRef.current) {
            dispatch(
                playPause({
                    isPlaying: !isPlaying,
                    currentTimeSong: audioRef.current.currentTime,
                }),
            );
        }
    };

    // Update current time music to redux after 1s
    useEffect(() => {
        const interval = setInterval(() => {
            if (audioRef.current) {
                dispatch(updateCurrentTime(audioRef.current.currentTime));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [dispatch, isPlaying]);

    // Check music is playing
    useEffect(
        () => {
            if (audioRef.current) {
                audioRef.current.src = currentSong?.audioUrl; // Update new song
                audioRef.current.currentTime = currentTimeSong || 0; // Update current time
                // audioRef.current.load(); // Browser discovers new song

                if (isPlaying) {
                    audioRef.current.play();
                }
            }
        },
        // eslint-disable-next-line
        [currentSong, isPlaying],
    );

    // Progress bar style of music
    const progressBarStyle = useMemo(() => {
        const progress = (currentTime / timeSong) * 100;

        return `linear-gradient(to right, var(--blue-light-color) ${progress}%, var(--gray-medium-color) ${progress}%)`;
    }, [currentTime, timeSong]);

    // Seek music
    const handleSeek = (e) => {
        const seekTime = e.target.value;
        setCurrentTime(seekTime);
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
        }
    };

    // Update current time music
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Format time become 00:00
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${
            seconds < 10 ? '0' : ''
        }${seconds}`;
    };

    // Move to next song
    const handleNextSong = () => {
        dispatch(nextSong());
    };

    // Move to prev song
    const handlePrevSong = () => {
        dispatch(prevSong());
    };

    // Toggle shuffle
    const handleToggleShuffle = () => {
        dispatch(toggleShuffle());
    };

    // Toggle repeat
    const handleToggleRepeat = () => {
        dispatch(toggleRepeat());
    };

    // ----------------------- Handle Volume ------------------------------

    // Handle when change volume
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

    // Calculate percentage
    const percentageVolume = useMemo(
        () => (valueVolume / 100) * 100,
        [valueVolume],
    );

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = valueVolume / 100;
        }
    }, [valueVolume]);

    return (
        <div className={cx('container')}>
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                    if (audioRef.current) {
                        dispatch(updateTimeSong(audioRef.current.duration));
                    }
                }}
                onEnded={() => {
                    if (isRepeat) {
                        audioRef.current.currentTime = 0;
                        audioRef.current.play();
                    } else {
                        dispatch(nextSong());
                    }
                }}
                src={currentSong?.audioUrl}
            />

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
            <div className={cx('box-center')}>
                <div>
                    <Tippy
                        content={
                            isShuffle
                                ? 'Tắt phát ngẫu nhiên'
                                : 'Bật phát ngẫu nhiên'
                        }
                        placement="top"
                        hideOnClick={false}
                    >
                        <div onClick={handleToggleShuffle}>
                            <FontAwesomeIcon
                                icon={faShuffle}
                                style={{
                                    color: isShuffle
                                        ? 'var(--blue-light-color)'
                                        : 'var(--white-color)',
                                }}
                            />
                        </div>
                    </Tippy>

                    <div
                        className={cx('icon-prev-song')}
                        onClick={handlePrevSong}
                    >
                        <FontAwesomeIcon icon={faForwardStep} />
                    </div>
                    <div>
                        <FontAwesomeIcon
                            onClick={handleTogglePlay}
                            icon={isPlaying ? faCirclePause : faCirclePlay}
                        />
                    </div>

                    <div onClick={handleNextSong}>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </div>

                    <Tippy
                        content={
                            isRepeat
                                ? 'Tắt lặp lại bài hát'
                                : 'Bật lặp lại bài hát'
                        }
                        placement="top"
                        hideOnClick={false}
                    >
                        <div onClick={handleToggleRepeat}>
                            <FontAwesomeIcon
                                icon={faRepeat}
                                style={{
                                    color: isRepeat
                                        ? 'var(--blue-light-color)'
                                        : 'var(--white-color)',
                                }}
                            />
                        </div>
                    </Tippy>
                </div>
                <div>
                    <span>{formatTime(currentTime)}</span>
                    <input
                        className={cx('audio-slider')}
                        type="range"
                        value={currentTime}
                        step="1"
                        min="0"
                        max={audioRef.current?.duration || 100}
                        onChange={handleSeek}
                        style={
                            progressBarStyle && { background: progressBarStyle }
                        }
                    />
                    <span>{formatTime(timeSong)}</span>
                </div>
            </div>
            <div className={cx('box-right')}>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faMicrophoneLines} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faWindowRestore} />
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

                <div>
                    <FontAwesomeIcon icon={faRectangleList} />
                </div>
            </div>
        </div>
    );
}

export default memo(Control);
