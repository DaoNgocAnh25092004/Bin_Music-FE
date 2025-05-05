import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faTrash,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import useDebounce from '~/hooks/useDebounce';
import * as MusicService from '~/Services/MusicService';

const cx = classNames.bind(styles);

const MAX_HISTORY = 10;
const STORAGE_KEY = 'search_history';

function Search() {
    const [isTippyVisible, setTippyVisible] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [keyword, setKeyword] = useState('');
    const debouncedSearchValue = useDebounce(keyword, 600);
    const [loading, setLoading] = useState(false);
    const [resultResearch, setResultResearch] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!debouncedSearchValue) {
            setResultResearch([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            try {
                const result = await MusicService.searchMusic({
                    page: 1,
                    limit: 5,
                    name: debouncedSearchValue,
                    artist: debouncedSearchValue,
                });
                setResultResearch(result.data || []);
            } catch (err) {
                console.error(err);
                setResultResearch([]);
            } finally {
                setLoading(false);
            }
        };

        fetchApi();
    }, [debouncedSearchValue]);

    useEffect(() => {
        const storedHistory =
            JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        setSearchHistory(storedHistory);
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
    }, [searchHistory]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const keyword = e.target.value.trim();

            if (keyword) {
                setSearchHistory((prevHistory) => {
                    const filtered = prevHistory.filter(
                        (item) => item !== keyword,
                    );
                    const newHistory = [keyword, ...filtered];
                    return newHistory.slice(0, MAX_HISTORY);
                });
            }

            e.target.value = '';
            setKeyword('');
            setTippyVisible(false);
        }
    };

    const handleDeleteItem = (item) => {
        const updated = searchHistory.filter((i) => i !== item);
        setSearchHistory(updated);
    };

    const handleHistoryClick = (item) => {
        setKeyword(item);
        setTippyVisible(true);
    };

    const handleAddMusic = (song) => {
        if (song.name) {
            setSearchHistory((prevHistory) => {
                const filtered = prevHistory.filter(
                    (item) => item !== song.name,
                );
                const newHistory = [song.name, ...filtered];
                return newHistory.slice(0, MAX_HISTORY);
            });
        }

        setKeyword('');

        setTippyVisible(false);

        navigate(`/music/${song._id}`);
    };

    const renderResult = (attrs) => (
        <div className={cx('box-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                {loading ? (
                    <div className={cx('loading-box')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </div>
                ) : resultResearch.length > 0 ? (
                    <div className={cx('results')}>
                        {resultResearch.map((song, index) => (
                            <div
                                key={index}
                                className={cx('result-item')}
                                onClick={() => handleAddMusic(song)}
                            >
                                <div className={cx('box-img')}>
                                    <img
                                        src={song.thumbnailUrl}
                                        alt={song.name}
                                    />
                                </div>
                                <div className={cx('box-info')}>
                                    <p className={cx('name')}>{song.name}</p>
                                    <p className={cx('artist')}>
                                        {song.listArtist.map((artist, i) => (
                                            <span key={i}>
                                                {artist.name}
                                                {i < song.listArtist.length - 1
                                                    ? ', '
                                                    : ''}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : searchHistory.length > 0 ? (
                    <div className={cx('history')}>
                        <ul className={cx('history-list')}>
                            {searchHistory.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleHistoryClick(item)}
                                >
                                    <div className={cx('history-item')}>
                                        <FontAwesomeIcon icon={faSearch} />
                                        <span>{item}</span>
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className={cx('icon-delete')}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteItem(item);
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className={cx('no-history')}>
                        Không có lịch sử tìm kiếm
                    </div>
                )}
            </PopperWrapper>
        </div>
    );

    return (
        <div className={cx('search')}>
            {loading ? (
                <FontAwesomeIcon className={cx('spin')} icon={faSpinner} />
            ) : (
                <FontAwesomeIcon
                    className={cx('icon-search')}
                    icon={faSearch}
                />
            )}
            <Tippy
                interactive
                visible={isTippyVisible}
                onClickOutside={() => setTippyVisible(false)}
                delay={[0, 700]}
                placement="bottom-end"
                render={renderResult}
            >
                <input
                    className={cx('input')}
                    type="text"
                    placeholder="Tìm kiếm bài hát..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => setTippyVisible(true)}
                    onKeyDown={handleKeyDown}
                />
            </Tippy>
        </div>
    );
}

export default Search;
