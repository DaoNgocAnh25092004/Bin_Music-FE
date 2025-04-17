import classNames from 'classnames/bind';
import { useState, useMemo, useEffect } from 'react';
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

import styles from './CentralControl.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import {
    faCirclePause,
    faForwardStep,
    faRepeat,
    faShuffle,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CentralControl({ audioRef }) {
    const {
        currentSong,
        isPlaying,
        currentTimeSong,
        timeSong,
        isShuffle,
        isRepeat,
    } = useSelector((state) => state.player, shallowEqual);

    const [currentTime, setCurrentTime] = useState(currentTimeSong);
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
        }, 500);

        return () => clearInterval(interval);
    }, [dispatch, audioRef]);

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

    return (
        <>
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
        </>
    );
}

export default CentralControl;
