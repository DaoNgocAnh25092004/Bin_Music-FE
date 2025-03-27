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

import styles from './ALbumDetail.module.scss';
import * as AlbumService from '~/Services/AlbumService';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import ListMusic, { Music } from '~/components/ListMusic';

const cx = classNames.bind(styles);

function AlbumDetail() {
    const { albumId } = useParams();
    const [album, setAlbum] = useState({});
    const dispatch = useDispatch();
    const { currentSong, playlist, currentTimeSong } = useSelector(
        (state) => state.player,
        shallowEqual,
    );

    useEffect(
        () => {
            const fetchData = async () => {
                const { album } = await AlbumService.GetAlbumById({ albumId });

                setAlbum(album);

                // Save playlist
                if (album.songs?.length > 0) {
                    // Check if the song is in the playlist
                    const isCurrentSongInAlbum = album.songs.some(
                        (song) => song._id === currentSong?._id,
                    );

                    // If the song is not in the playlist and album new different from the current album
                    if (
                        !isCurrentSongInAlbum ||
                        JSON.stringify(album.songs) !== JSON.stringify(playlist)
                    ) {
                        dispatch(setPlayList(album.songs));
                    }
                }
            };

            fetchData();
        },
        // eslint-disable-next-line
        [albumId, dispatch, currentSong],
    );

    const handlePlaySong = (music) => {
        if (currentSong?._id !== music._id) {
            // Current song
            dispatch(setCurrentSong(music));

            // Update current new time the song = 0
            dispatch(updateCurrentTime(0));
        } else {
            // Play when music is paused and set current time
            dispatch(playPause({ isPlaying: true, currentTimeSong }));
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('box-album')}>
                <div>
                    <img src={album.urlImageAlbum} alt={album.name} />
                </div>
                <div>
                    <h3>{album.name}</h3>
                    <p>
                        Cập nhật:{' '}
                        {new Date(album.updatedAt).toLocaleDateString()}
                    </p>
                </div>

                <div className={cx('album-control')}>
                    <Button
                        primary
                        leftIcon={<FontAwesomeIcon icon={faPlay} />}
                        animation
                    >
                        TIẾP TỤC PHÁT
                    </Button>
                </div>
            </div>
            <div>
                <div className={cx('title-list')}>
                    <p>BÀI HÁT</p>

                    <p>THỜI GIAN</p>
                </div>
                <ListMusic col_1>
                    {album.songs?.map((music) => (
                        <Music
                            key={music._id}
                            music={music}
                            handlePlaySong={handlePlaySong}
                        />
                    ))}
                </ListMusic>
            </div>
        </div>
    );
}

export default AlbumDetail;
