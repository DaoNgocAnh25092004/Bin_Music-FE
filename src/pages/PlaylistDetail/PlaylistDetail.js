import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
    setCurrentSong,
    playPause,
    setPlayList as setPlayListRedux,
    updateCurrentTime,
} from '~/redux/slices/playerSlice';

import styles from './PLaylistDetail.module.scss';
import * as PLaylistService from '~/Services/PLaylistService';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faPlay, faRefresh } from '@fortawesome/free-solid-svg-icons';
import ListMusic, { Music } from '~/components/ListMusic';
import Image from '~/components/Image';
import images from '~/assets/images';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function PlaylistDetail() {
    const { playlistId } = useParams();
    const [playlist, setPlayList] = useState({});
    const [randomMusic, setRandomMusic] = useState([]);
    const dispatch = useDispatch();
    const {
        currentSong,
        playlist: reduxPlaylist,
        currentTimeSong,
    } = useSelector((state) => state.player, shallowEqual);

    useEffect(() => {
        const fetchData = async () => {
            const { playlist, randomSongs } =
                await PLaylistService.getPlaylistById(playlistId);

            setPlayList(playlist);
            setRandomMusic(randomSongs);
        };

        fetchData();
    }, [playlistId]);

    const renderImageContent = () => {
        if (!playlist.songs || playlist.songs.length === 0) {
            return (
                <Image
                    src={images.albumDefault}
                    alt="Ảnh backup"
                    className={cx('single-image')}
                />
            );
        } else if (playlist.songs.length >= 4) {
            return (
                <div className={cx('grid-image')}>
                    {playlist.songs.slice(0, 4).map((img, index) => (
                        <Image
                            key={index}
                            src={img.thumbnailUrl}
                            alt={`img-${index}`}
                        />
                    ))}
                </div>
            );
        } else {
            return (
                <Image
                    src={playlist.songs[0].thumbnailUrl}
                    alt={playlist.songs[0].name}
                    className={cx('single-image')}
                />
            );
        }
    };

    const handlePlaySong = (music) => {
        if (currentSong?._id !== music._id) {
            // Add new playlist
            if (
                JSON.stringify(reduxPlaylist) !== JSON.stringify(playlist.songs)
            ) {
                dispatch(setPlayListRedux(playlist.songs));
            }

            // Current song
            dispatch(setCurrentSong(music));

            // Update current new time the song = 0
            dispatch(updateCurrentTime(0));
        } else {
            // Play when music is paused and set current time
            dispatch(playPause({ isPlaying: true, currentTimeSong }));
        }
    };

    const handleRefreshSong = () => {
        const fetchData = async () => {
            const { randomSongs } = await PLaylistService.getPlaylistById(
                playlistId,
            );
            setRandomMusic(randomSongs);
        };
        fetchData();
    };

    const handleAddPlaylist = (songId) => {
        const fetchData = async () => {
            try {
                const { newSong } = await PLaylistService.addSongToPlaylist(
                    playlistId,
                    songId,
                );

                setPlayList((prev) => ({
                    ...prev,
                    songs: [...prev.songs, newSong],
                }));

                setRandomMusic((prev) =>
                    prev.filter((music) => music._id !== songId),
                );

                toast.success('Thêm bài hát vào playlist thành công!');
            } catch (error) {
                console.error('Error adding song to playlist:', error);
                toast.error('Thêm bài hát thất bại.');
            }
        };
        fetchData();
    };

    const handleContinuePlay = () => {
        if (playlist.songs && playlist.songs.length > 0) {
            // Set list song to redux
            dispatch(setPlayListRedux(playlist.songs));

            // select first song is play
            const firstSong = playlist.songs[0];
            dispatch(setCurrentSong(firstSong));

            // reset current time to 0
            dispatch(updateCurrentTime(0));
            dispatch(playPause({ isPlaying: true, currentTimeSong: 0 }));
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('box-album')}>
                <div>{playlist.songs && renderImageContent()}</div>
                <div>
                    <h3>{playlist.name}</h3>
                    <p>
                        Cập nhật:{' '}
                        {new Date(playlist.updatedAt).toLocaleDateString()}
                    </p>
                </div>

                <div className={cx('album-control')}>
                    <Button
                        primary
                        leftIcon={<FontAwesomeIcon icon={faPlay} />}
                        animation
                        onClick={handleContinuePlay}
                    >
                        TIẾP TỤC PHÁT
                    </Button>
                </div>
            </div>
            <div>
                {playlist.songs?.length !== 0 ? (
                    <div>
                        <h2 className={cx('title-playlist')}>
                            PLaylist của bạn
                        </h2>
                        <div className={cx('title-list')}>
                            <p>BÀI HÁT</p>

                            <p>THỜI GIAN</p>
                        </div>
                        <ListMusic dataAos="fade-down" col_1>
                            {playlist.songs?.map((music) => (
                                <Music
                                    key={music._id}
                                    music={music}
                                    handlePlaySong={handlePlaySong}
                                    isLyric
                                    isHeart
                                    isMore
                                />
                            ))}
                        </ListMusic>
                    </div>
                ) : (
                    <div className={cx('box-empty')}>
                        <FontAwesomeIcon icon={faMusic} />
                        <h4>Không có bài hát trong playlist của bạn</h4>
                    </div>
                )}

                <div>
                    <div className={cx('box-title-random')}>
                        <h2 className={cx('title-random')}>Bài hát gợi ý</h2>

                        <Button
                            small
                            primary
                            leftIcon={<FontAwesomeIcon icon={faRefresh} />}
                            onClick={handleRefreshSong}
                            animation
                        >
                            LÀM MỚI
                        </Button>
                    </div>
                    <div className={cx('title-list')}>
                        <p>BÀI HÁT</p>

                        <p>THỜI GIAN</p>
                    </div>
                    <ListMusic dataAos="fade-down" col_1>
                        {randomMusic?.map((music) => (
                            <Music
                                key={music._id}
                                music={music}
                                handlePlaySong={handlePlaySong}
                                isAddPlaylist
                                handleAddPlaylist={() =>
                                    handleAddPlaylist(music._id)
                                }
                            />
                        ))}
                    </ListMusic>
                </div>
            </div>
        </div>
    );
}

export default PlaylistDetail;
