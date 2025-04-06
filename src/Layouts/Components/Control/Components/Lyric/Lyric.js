import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

import styles from './Lyric.module.scss';
import Image from '~/components/Image';
import * as lyricService from '~/Services/LyricService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { closeLyric } from '~/redux/slices/lyricSlice';

const cx = classNames.bind(styles);

function Lyric() {
    const { currentSong, currentTimeSong } = useSelector(
        (state) => state.player,
    );
    const [lyric, setLyric] = useState('');
    const [lyricLines, setLyricLines] = useState([]);
    const lyricRefs = useRef([]);
    const prevActiveIndexRef = useRef(null);
    const [isClosing, setIsClosing] = useState(false);
    const dispatch = useDispatch();

    // Fetch lời bài hát
    useEffect(() => {
        const fetchLyric = async () => {
            if (currentSong && currentSong._id) {
                try {
                    const res = await lyricService.GetLyric({
                        musicId: currentSong._id,
                    });
                    setLyric(res.lyric);
                } catch (error) {
                    console.error('Lỗi khi fetch lyric:', error);
                }
            }
        };

        fetchLyric();
    }, [currentSong]);

    // Tách lời bài hát thành các dòng
    const cleanLyricLines = lyric
        .split(/\r?\n/)
        .map((line) => {
            const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
            if (match) {
                return {
                    time:
                        parseInt(match[1], 10) * 60 +
                        parseFloat(match[2] + '.' + match[3]),
                    text: match[4].trim(),
                };
            }
            return null;
        })
        .filter((line) => line !== null);

    useEffect(
        () => {
            setLyricLines(cleanLyricLines);
        },
        // eslint-disable-next-line
        [lyric],
    );

    // Cuộn đến dòng active
    useEffect(() => {
        const activeLineIndex = lyricLines.findIndex((line, index) => {
            const nextLine = lyricLines[index + 1];
            const endTime = nextLine ? nextLine.time : Infinity;
            return currentTimeSong >= line.time && currentTimeSong < endTime;
        });

        if (
            activeLineIndex !== -1 &&
            activeLineIndex !== prevActiveIndexRef.current &&
            lyricRefs.current[activeLineIndex]
        ) {
            lyricRefs.current[activeLineIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            prevActiveIndexRef.current = activeLineIndex;
        }
    }, [currentTimeSong, lyricLines]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            dispatch(closeLyric());
        }, 500);
    };

    return (
        <div className={cx('container', { hide: isClosing })}>
            <div className={cx('box-header')}>
                <div onClick={handleClose}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
            <div className={cx('box-info')}>
                <div className={cx('box-img')}>
                    <Image
                        src={currentSong.thumbnailUrl}
                        alt={currentSong.name}
                    />
                </div>
                <div className={cx('box-lyric')}>
                    {lyricLines.map((line, index) => {
                        const nextLine = lyricLines[index + 1];
                        const endTime = nextLine ? nextLine.time : Infinity;

                        const isActive =
                            currentTimeSong >= line.time &&
                            currentTimeSong < endTime;
                        const isPassed = currentTimeSong >= endTime;
                        const isUpcoming = currentTimeSong < line.time;

                        return (
                            <p
                                key={index}
                                ref={(el) => (lyricRefs.current[index] = el)}
                                className={cx({
                                    active: isActive,
                                    passed: isPassed,
                                    upcoming: isUpcoming,
                                })}
                            >
                                {line.text}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Lyric;
