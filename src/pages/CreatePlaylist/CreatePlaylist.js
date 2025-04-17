import classNames from 'classnames/bind';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import styles from './CreatePlaylist.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faLightbulb,
    faMagic,
    faMusic,
    faPlay,
    faSave,
    faSpinner,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useGenericMutation } from '~/hooks/useMutationHook';
import * as AIService from '~/Services/AIService';
import Image from '~/components/Image';
import {
    playPause,
    setCurrentSong,
    updateCurrentTime,
} from '~/redux/slices/playerSlice';

const cx = classNames.bind(styles);

function CreatePlaylist() {
    const [description, setDescription] = useState('');
    const [songCount, setSongCount] = useState(10);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlaylist, setGeneratedPlaylist] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('Tất cả');
    const [selectedLanguage, setSelectedLanguage] = useState('Tất cả');
    const [visibleCount, setVisibleCount] = useState(10);
    const { currentSong, currentTimeSong } = useSelector(
        (state) => state.player,
        shallowEqual,
    );

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 10);
    };

    const displayedSongs = generatedPlaylist.slice(0, visibleCount);

    const dispatch = useDispatch();

    // Mutation create music
    const mutationCreateMusic = useGenericMutation((data) =>
        AIService.createPlaylist(data),
    );

    const genres = [
        'Tất cả',
        'Pop',
        'Ballad',
        'Rock',
        'Hip Hop',
        'R&B',
        'EDM',
        'Jazz',
        'Classical',
    ];
    const languages = [
        'Tất cả',
        'Tiếng Việt',
        'Tiếng Anh',
        'Tiếng Hàn',
        'Tiếng Nhật',
        'Tiếng Trung',
    ];

    const handleGeneratePlaylist = () => {
        if (!description) return;
        setIsGenerating(true);

        const formData = {
            description,
            songCount,
            genre: selectedGenre,
            languages: selectedLanguage,
        };

        console.table(formData);

        mutationCreateMusic.mutate(formData, {
            onSuccess: (data) => {
                setGeneratedPlaylist(data.songs);
                setIsGenerating(false);
            },
            onError: (error) => {
                console.error('Error generating playlist:', error);
                setIsGenerating(false);
            },
        });

        // setTimeout(() => {
        //     const mockPlaylist = [
        //         {
        //             id: 1,
        //             title: 'Có Chắc Yêu Là Đây',
        //             artist: 'Sơn Tùng M-TP',
        //             duration: '3:52',
        //             thumbnail:
        //                 'https://readdy.ai/api/search-image?query=modern%20album%20cover%20with%20vibrant%20colors%20for%20Vietnamese%20pop%20music%2C%20professional%20studio%20quality%2C%20clean%20background%20with%20blue%20and%20purple%20gradient%2C%20minimalist%20design&width=60&height=60&seq=1&orientation=squarish',
        //         },
        //         {
        //             id: 2,
        //             title: 'Hương',
        //             artist: 'Văn Mai Hương',
        //             duration: '4:10',
        //             thumbnail:
        //                 'https://readdy.ai/api/search-image?query=elegant%20album%20cover%20for%20Vietnamese%20ballad%20music%2C%20soft%20lighting%2C%20pastel%20colors%2C%20professional%20studio%20quality%2C%20clean%20background%20with%20pink%20and%20blue%20tones%2C%20minimalist%20aesthetic&width=60&height=60&seq=2&orientation=squarish',
        //         },
        //         {
        //             id: 3,
        //             title: 'Chạy Ngay Đi',
        //             artist: 'Sơn Tùng M-TP',
        //             duration: '4:32',
        //             thumbnail:
        //                 'https://readdy.ai/api/search-image?query=dramatic%20album%20cover%20for%20Vietnamese%20pop%20music%2C%20dark%20atmosphere%2C%20professional%20studio%20quality%2C%20clean%20background%20with%20black%20and%20red%20gradient%2C%20minimalist%20design%20with%20high%20contrast&width=60&height=60&seq=3&orientation=squarish',
        //         },
        //         {
        //             id: 4,
        //             title: 'Tình Bạn Diệu Kỳ',
        //             artist: 'AMEE, Ricky Star, Lăng LD',
        //             duration: '3:09',
        //             thumbnail:
        //                 'https://readdy.ai/api/search-image?query=colorful%20album%20cover%20for%20Vietnamese%20pop%20collaboration%2C%20youthful%20vibe%2C%20professional%20studio%20quality%2C%20clean%20background%20with%20yellow%20and%20blue%20gradient%2C%20minimalist%20design%20with%20geometric%20elements&width=60&height=60&seq=4&orientation=squarish',
        //         },
        //         {
        //             id: 5,
        //             title: 'Trốn Tìm',
        //             artist: 'Đen, MTV',
        //             duration: '4:21',
        //             thumbnail:
        //                 'https://readdy.ai/api/search-image?query=artistic%20album%20cover%20for%20Vietnamese%20rap%20music%2C%20urban%20aesthetic%2C%20professional%20studio%20quality%2C%20clean%20background%20with%20grayscale%20gradient%2C%20minimalist%20design%20with%20subtle%20texture&width=60&height=60&seq=5&orientation=squarish',
        //         },
        //     ];
        //     setGeneratedPlaylist(mockPlaylist);

        // }, 2000);
    };

    // Handle remove song from playlist
    const handleRemoveSong = (songId) => {
        setGeneratedPlaylist((prevPlaylist) =>
            prevPlaylist.filter((song) => song._id !== songId),
        );
    };

    // Handle play song
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
            <h2 className={cx('title')}>Tạo Playlist Thông Minh Với AI</h2>
            <div className={cx('textarea-wrapper')}>
                <textarea
                    className={cx('description')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Mô tả playlist bạn muốn tạo... (Ví dụ: Những bài hát Pop Ballad buồn về tình yêu hoặc Nhạc sôi động cho buổi tập gym)"
                />
            </div>

            <div className={cx('flex-wrapper')}>
                <div>
                    <label className={cx('label')}>Thể loại</label>
                    <div className={cx('select-wrapper')}>
                        <select
                            className={cx('select-input')}
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                        <div className={cx('select-icon')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    </div>
                </div>
                <div>
                    <label className={cx('label')}>Ngôn ngữ</label>
                    <div className={cx('select-wrapper')}>
                        <select
                            className={cx('select-input')}
                            value={selectedLanguage}
                            onChange={(e) =>
                                setSelectedLanguage(e.target.value)
                            }
                        >
                            {languages.map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                        <div className={cx('select-icon')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('flex-wrapper')}>
                <div className={cx('range-group')}>
                    <label>Số lượng bài hát: {songCount}</label>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={songCount}
                        onChange={(e) => setSongCount(parseInt(e.target.value))}
                    />
                    <div className={cx('range-values')}>
                        <span>1</span>
                        <span>50</span>
                    </div>
                </div>
            </div>

            <div className={cx('generate-button-wrapper')}>
                <button
                    onClick={handleGeneratePlaylist}
                    disabled={isGenerating || !description}
                    className={cx('generate-button')}
                >
                    {isGenerating ? (
                        <>
                            <FontAwesomeIcon
                                className={cx('icon-spinner')}
                                icon={faSpinner}
                            />
                            <span>Đang tạo playlist...</span>
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faMagic} />
                            <span>Tạo Playlist</span>
                        </>
                    )}
                </button>
            </div>

            {generatedPlaylist.length > 0 && (
                <div className={cx('playlist-container')}>
                    <div className={cx('background-overlay')}></div>

                    <div className={cx('playlist-header')}>
                        <h2 className={cx('playlist-title')}>
                            Kết quả ({generatedPlaylist.length} bài hát)
                        </h2>
                        <Button
                            primary
                            animation
                            borderRadius4
                            leftIcon={<FontAwesomeIcon icon={faSave} />}
                        >
                            Lưu Playlist
                        </Button>
                    </div>

                    <div className={cx('playlist-scroll')}>
                        {displayedSongs.map((song, index) => (
                            <div key={song._id} className={cx('song-item')}>
                                <div className={cx('song-index')}>
                                    {index + 1}
                                </div>
                                <div className={cx('song-thumbnail')}>
                                    <Image
                                        src={song.thumbnailUrl}
                                        alt={song.name}
                                    />
                                </div>
                                <div className={cx('song-info')}>
                                    <h3 className={cx('song-title')}>
                                        {song.name}
                                    </h3>
                                    <p className={cx('artist-name')}>
                                        {song.listArtist.map(
                                            (artist, index) => (
                                                <span key={index}>
                                                    {artist.name}
                                                    {index <
                                                    song.listArtist.length - 1
                                                        ? ', '
                                                        : ''}
                                                </span>
                                            ),
                                        )}
                                    </p>
                                </div>
                                <div className={cx('song-actions')}>
                                    <button
                                        className={cx('play-button')}
                                        onClick={() => handlePlaySong(song)}
                                    >
                                        <FontAwesomeIcon icon={faPlay} />
                                    </button>
                                    <button
                                        className={cx('remove-button')}
                                        onClick={() =>
                                            handleRemoveSong(song._id)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleCount < generatedPlaylist.length && (
                        <div className={cx('load-more')}>
                            <button
                                className={cx('load-more-button')}
                                onClick={handleLoadMore}
                            >
                                <span className={cx('load-more-text')}>
                                    Tải thêm bài hát
                                </span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {generatedPlaylist.length === 0 && (
                <div className={cx('playlist-container')}>
                    {/* Điều kiện hiển thị khi không đang tạo playlist và không có playlist */}
                    {!isGenerating &&
                        generatedPlaylist.length === 0 &&
                        description && (
                            <div className={cx('message-container')}>
                                <FontAwesomeIcon
                                    className={cx('icon-light')}
                                    icon={faMusic}
                                />
                                <p>
                                    Nhấn "Tạo Playlist" để AI tạo danh sách nhạc
                                    dựa trên mô tả của bạn
                                </p>
                            </div>
                        )}

                    {/* Điều kiện khi chưa có mô tả */}
                    {!description && (
                        <div className={cx('message-container')}>
                            <FontAwesomeIcon
                                className={cx('icon-light')}
                                icon={faLightbulb}
                            />
                            <p className={cx('message-title')}>
                                Hãy mô tả playlist bạn muốn tạo
                            </p>
                            <p className={cx('message-subtitle')}>
                                Hoặc chọn một trong các gợi ý dưới đây:
                            </p>
                            <div className={cx('suggestions')}>
                                {[
                                    'Nhạc trẻ sôi động cho buổi tiệc',
                                    'Những bài hát acoustic nhẹ nhàng để thư giãn',
                                    'Playlist nhạc tập trung làm việc',
                                    'Nhạc Pop Ballad buồn về tình yêu',
                                    'Nhạc EDM sôi động cho phòng gym',
                                    'Nhạc R&B thư giãn cho buổi tối',
                                ].map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() =>
                                            setDescription(suggestion)
                                        }
                                        className={cx('suggestion-button')}
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CreatePlaylist;
