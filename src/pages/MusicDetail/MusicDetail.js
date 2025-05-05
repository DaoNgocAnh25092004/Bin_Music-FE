import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
    setCurrentSong,
    playPause,
    setPlayList,
    updateCurrentTime,
} from '~/redux/slices/playerSlice';

import styles from './MusicDetail.module.scss';
import * as MusicService from '~/Services/MusicService';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import ListMusic, { Music } from '~/components/ListMusic';

const cx = classNames.bind(styles);

function MusicDetail() {
    const { musicId } = useParams();
    const [music, setMusic] = useState({});
    const dispatch = useDispatch();
    const { currentSong, playlist, currentTimeSong } = useSelector(
        (state) => state.player,
        shallowEqual,
    );

    useEffect(
        () => {
            const fetchData = async () => {
                const music = await MusicService.GetMusicById({ musicId });

                setMusic(music);
            };

            fetchData();
        },
        // eslint-disable-next-line
        [musicId, dispatch, currentSong],
    );

    const handlePlaySong = (music) => {
        if (currentSong?._id !== music._id) {
            // Đảm bảo playlist là mảng
            dispatch(setPlayList([music])); // 👈 sửa tại đây

            dispatch(setCurrentSong(music));
            dispatch(updateCurrentTime(0));
        } else {
            dispatch(playPause({ isPlaying: true, currentTimeSong }));
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('box-album')}>
                <div>
                    <img src={music.thumbnailUrl} alt={music.name} />
                </div>
                <div>
                    <h3>{music.name}</h3>
                    <p>
                        Phát hành:{' '}
                        {new Date(music.updatedAt).toLocaleDateString()}
                    </p>
                </div>

                <div className={cx('album-control')}>
                    <Button
                        primary
                        leftIcon={<FontAwesomeIcon icon={faPlay} />}
                        animation
                        onClick={() => handlePlaySong(music)}
                    >
                        PHÁT BÀI HÁT
                    </Button>
                </div>
            </div>
            <div>
                <div className={cx('title-list')}>
                    <p>BÀI HÁT</p>

                    <p>THỜI GIAN</p>
                </div>
                <ListMusic dataAos="fade-down" col_1>
                    <Music
                        key={music._id}
                        music={music}
                        handlePlaySong={handlePlaySong}
                        isLyric
                        isHeart
                        isMore
                    />
                </ListMusic>

                <div className={cx('title-info')}>
                    <p>THÔNG TIN BÀI HÁT</p>
                </div>

                <div className={cx('box-info')}>
                    <div>
                        <p>Nghệ sĩ:</p>
                        <p>
                            {' '}
                            {music.listArtist
                                ?.map((artist) => artist.name)
                                .join(', ')}
                        </p>
                    </div>
                    <div>
                        <p>Thể loại</p>
                        <p>{music.genres?.join(', ')}</p>
                    </div>
                    <div>
                        <p>Lượt yêu thích:</p>
                        <p>{music.favoriteCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicDetail;
