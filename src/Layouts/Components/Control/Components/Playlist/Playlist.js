import classNames from 'classnames/bind';
import ListMusic, { Music } from '~/components/ListMusic';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import styles from './Playlist.module.scss';
import {
    playPause,
    setCurrentSong,
    updateCurrentTime,
} from '~/redux/slices/playerSlice';

const cx = classNames.bind(styles);

function Playlist() {
    const { currentSong, playlist, currentTimeSong } = useSelector(
        (state) => state.player,
        shallowEqual,
    );
    const { isHiding } = useSelector((state) => state.playlist);
    const dispatch = useDispatch();

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
        <div className={cx('container', { hide: isHiding })}>
            {currentSong && (
                <div className={cx('song-current')}>
                    <ListMusic col_1 playlist>
                        <Music
                            key={currentSong._id}
                            music={currentSong}
                            handlePlaySong={handlePlaySong}
                            isLyric
                            isHeart
                            isMore
                        />
                    </ListMusic>
                </div>
            )}

            <div className={cx('title')}>Danh sách phát</div>
            <ListMusic col_1 playlist>
                {playlist
                    ?.filter((music) => music._id !== currentSong?._id)
                    .map((music) => (
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

export default Playlist;
