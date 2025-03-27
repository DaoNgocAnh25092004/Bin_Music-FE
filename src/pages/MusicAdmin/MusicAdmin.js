import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames/bind';

import styles from './MusicAdmin.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import * as MusicAdminService from '~/Services/MusicAdminService';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function MusicAdmin() {
    const [musicList, setMusicList] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchMusic = async () => {
        if (!hasMore) return;
        try {
            const { data, hasMore } = await MusicAdminService.getListMusic({
                page,
                limit: 10,
            });

            setMusicList((prev) => [...prev, ...data]);
            setPage(page + 1);
            setHasMore(hasMore);
        } catch (error) {
            console.error('Lỗi khi tải danh sách bài hát:', error);
        }
    };

    useEffect(
        () => {
            fetchMusic();
        },
        // eslint-disable-next-line
        [],
    );

    return (
        <div className={cx('container')}>
            <div className={cx('box-title')}>
                <h2 className={cx('title-table')}>Danh sách bài hát</h2>
                <div>
                    <Button
                        to={config.routes.musicAdminCreate}
                        primary
                        animation
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        className={cx('btn-add')}
                    >
                        Thêm bài hát
                    </Button>
                    <Button
                        primary
                        animation
                        leftIcon={<FontAwesomeIcon icon={faTrash} />}
                        className={cx('btn-delete')}
                    >
                        Xóa bài hát
                    </Button>
                </div>
            </div>

            <div className={cx('table-wrapper')} id="scrollableDiv">
                <InfiniteScroll
                    dataLength={musicList.length}
                    next={fetchMusic}
                    hasMore={hasMore}
                    loader={<h4>Đang tải...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên bài hát</th>
                                <th>Danh sách nghệ sĩ - Vai trò</th>
                                <th>Thể loại</th>
                                <th>Ngày phát hành</th>
                                <th>Trending</th>
                                <th>Audio</th>
                                <th>Ảnh bìa</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {musicList.map((song, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{song.name}</td>
                                    <td>
                                        {song.listArtist.map((artist, i) => (
                                            <span key={i}>
                                                {artist.name}: {artist.role}
                                                {i <
                                                    song.listArtist.length -
                                                        1 && ', '}
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        {song.genres.map((genre, index) => (
                                            <span key={index}>
                                                {genre}
                                                {index <
                                                    song.genres.length - 1 &&
                                                    ', '}
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        {new Date(
                                            song.createdAt,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>{song.trending ? '🔥' : '❌'}</td>
                                    <td>
                                        <audio controls>
                                            <source
                                                src={song.audioUrl}
                                                type="audio/mpeg"
                                            />
                                        </audio>
                                    </td>
                                    <td>
                                        <Image
                                            src={song.thumbnailUrl}
                                            alt={`${song.name} cover`}
                                        />
                                    </td>
                                    <td>Edit | Delete</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default MusicAdmin;
