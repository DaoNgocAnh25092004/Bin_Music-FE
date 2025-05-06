import classNames from 'classnames/bind';
import { useEffect, useState, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import PropTypes from 'prop-types';

import styles from './ListMusic.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faHeart as faHeartSolid,
    faMicrophone,
    faPlay,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import images from '~/assets/images';
import * as FavoriteService from '~/Services/FavoriteService';
import { useGenericMutation } from '~/hooks/useMutationHook';
import { toast } from 'react-toastify';
import { openLyric } from '~/redux/slices/lyricSlice';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);

function Music({
    music,
    handlePlaySong,
    isLyric,
    isHeart,
    handleAddPlaylist,
    isMore,
    favoriteSongIds = [],
}) {
    const [duration, setDuration] = useState('00:00');
    const [isAddHeart, setIsAddHeart] = useState(false);
    const { currentSong, isPlaying } = useSelector(
        (state) => state.player,
        shallowEqual,
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (favoriteSongIds.includes(music._id)) {
            setIsAddHeart(true);
        } else {
            setIsAddHeart(false);
        }
    }, [favoriteSongIds, music._id]);

    const checkPlaying = useMemo(
        () => currentSong?._id === music._id && isPlaying,
        [currentSong, isPlaying, music],
    );

    // Mutation to add song to favorites
    const mutationAddSongToFavorites = useGenericMutation((data) =>
        FavoriteService.AddFavorite(data),
    );

    // Mutation to remove song from favorites
    const mutationRemoveSongFromFavorites = useGenericMutation((data) =>
        FavoriteService.RemoveFavorite(data),
    );

    const { id } = useSelector((state) => state.user);

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

    const handleHeart = async (musicId) => {
        const formData = {
            userId: id,
            songId: musicId,
        };

        if (isAddHeart) {
            mutationRemoveSongFromFavorites.mutate(formData, {
                onSuccess: () => {
                    setIsAddHeart(false);
                    toast.success('Đã xoá khỏi danh sách yêu thích!');
                },
                onError: (error) => {
                    console.error('Error removing song from favorites:', error);
                },
            });
        } else {
            mutationAddSongToFavorites.mutate(formData, {
                onSuccess: () => {
                    setIsAddHeart(true);
                    toast.success('Thêm vào danh sách yêu thích thành công!');
                },
                onError: (error) => {
                    console.error('Error adding song to favorites:', error);
                },
            });
        }
    };

    return (
        <div
            className={cx('music', { playing: checkPlaying })}
            onClick={() => handlePlaySong(music)}
        >
            <div className={cx('box-img')}>
                <Image src={music.thumbnailUrl} alt={music.name || 'Image'} />
            </div>
            <div className={cx('box-info')}>
                <div>
                    <p
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/music/${music._id}`);
                        }}
                    >
                        {music.name}
                    </p>
                    {music.premium && <span>PREMIUM</span>}
                </div>
                <p>
                    {music.listArtist?.map((artist, index) => (
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
                            content={'Phát cùng lời bài hát'}
                            placement="top"
                            hideOnClick={false}
                        >
                            <div
                                className={cx('icon')}
                                onClick={() => {
                                    dispatch(openLyric());
                                }}
                            >
                                <FontAwesomeIcon icon={faMicrophone} />
                            </div>
                        </Tippy>
                    )}

                    {isHeart && (
                        <Tippy
                            content={isAddHeart ? 'Bỏ thích' : 'Thích'}
                            placement="top"
                            hideOnClick={false}
                        >
                            <div
                                className={cx('icon')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleHeart(music._id);
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        isAddHeart
                                            ? faHeartSolid
                                            : faHeartRegular
                                    }
                                    className={cx({ liked: isAddHeart })}
                                />
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
    favoriteSongIds: PropTypes.array,
};

export default Music;
