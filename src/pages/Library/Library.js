import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import styles from './Library.module.scss';
import * as PLaylist from '~/Services/PLaylistService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ListTopic, { Topic } from '../Explore/ListTopic';
import ListMusic, { Music } from '~/components/ListMusic';
import * as FavoriteService from '~/Services/FavoriteService';
import {
    playPause,
    setCurrentSong,
    setPlayList,
    updateCurrentTime,
} from '~/redux/slices/playerSlice';

const cx = classNames.bind(styles);

function Library() {
    const [playlists, setPlaylists] = useState([]);
    const [listMusicHeart, setListMusicHeart] = useState([]);
    const { id: userId } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { currentSong, currentTimeSong } = useSelector(
        (state) => state.player,
        shallowEqual,
    );

    const navigate = useNavigate();

    // Get playlist for user
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await PLaylist.getAllPlaylist();
                setPlaylists(response.playlists);
            } catch (error) {
                toast.error('Lỗi khi tải danh sách playlist');
            }
        };
        fetchPlaylists();
    }, []);

    // Get favorite songs for user
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!userId) return;

            try {
                const response = await FavoriteService.GetFavoriteFullSong(
                    userId,
                );
                setListMusicHeart(response.songs);
            } catch (error) {
                toast.error('Lỗi khi tải bài hát yêu thích');
            }
        };
        fetchFavorites();
    }, [userId]);

    const handlePlaySong = (music) => {
        if (currentSong?._id !== music._id) {
            // Current song
            dispatch(setCurrentSong(music));

            // Update current new time the song = 0
            dispatch(updateCurrentTime(0));

            // Set Playlist
            dispatch(setPlayList(listMusicHeart));
        } else {
            // Play when music is paused and set current time
            dispatch(playPause({ isPlaying: true, currentTimeSong }));
        }
    };

    return (
        <div>
            <div className={cx('title')}>
                <div className={cx('title-name')}>
                    <p>PLAYLIST</p>
                    <div
                        className={cx('btn-add-playlist')}
                        onClick={() => navigate('/create-playlist')}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>

                <div className={cx('title-view-all')}>
                    <span>Tất Cả</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>

            {playlists.length === 0 ? (
                <div className={cx('box-empty')}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() => navigate('/create-playlist')}
                    />
                    <h4>Hãy tạo playlist cho riêng bạn</h4>
                </div>
            ) : (
                <ListTopic>
                    {playlists?.slice(0, 5).map((album, index) => (
                        <Topic
                            key={album._id}
                            isPlaylist={true}
                            id={album._id}
                            name={album.name}
                            songImages={album.songImages}
                            aosDelay={index * 200}
                        />
                    ))}
                </ListTopic>
            )}

            <div className={cx('title')}>
                <div className={cx('title-name')}>Bài hát yêu thích</div>
            </div>

            <ListMusic dataAos="fade-right">
                {listMusicHeart.map((music) => (
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
    );
}

export default Library;
