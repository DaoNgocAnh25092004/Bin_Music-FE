import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';

import styles from './Library.module.scss';
import * as PLaylist from '~/Services/PLaylistService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ListTopic, { Topic } from '../Explore/ListTopic';

const cx = classNames.bind(styles);

function Library() {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    // Call API get all playlist
    useEffect(() => {
        const fetchSuggestedSongs = async () => {
            try {
                const response = await PLaylist.getAllPlaylist();

                setPlaylists(response.playlists);
            } catch (error) {
                toast.error('Lỗi khi tải danh sách gợi ý');
            }
        };
        fetchSuggestedSongs();
    }, []);

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
        </div>
    );
}

export default Library;
