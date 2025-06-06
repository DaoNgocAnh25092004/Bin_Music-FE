import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Styles from './Explore.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faRefresh } from '@fortawesome/free-solid-svg-icons';
import ListTopic, { Topic } from '../../components/ListTopic';
// import Chart from './Chart';
import Image from '~/components/Image';
import images from '~/assets/images';
import * as HomeService from '~/Services/HomeService';
import Button from '~/components/Button';
import ListMusic, { Music } from '~/components/ListMusic';
import {
    playPause,
    setCurrentSong,
    setPlayList,
    updateCurrentTime,
} from '~/redux/slices/playerSlice';
import {
    SkeletonBox,
    SkeletonMusic,
    SkeletonPartner,
} from '~/components/Skeleton/Skeleton';

const cx = classNames.bind(Styles);

function Explore() {
    // const [activeButton, setActiveButton] = useState('Tất Cả');
    const [albumsByCategory, setAlbumsByCategory] = useState([]);
    const [suggestedSongs, setSuggestedSongs] = useState([]);
    const [sliceCountAlbum, setSliceCountAlbum] = useState(5);
    const [sliceCountMusic, setSliceCountMusic] = useState(9);
    const [loadingAlbums, setLoadingAlbums] = useState(true);
    const [loadingSuggested, setLoadingSuggested] = useState(true);

    const dispatch = useDispatch();
    const { currentSong, currentTimeSong } = useSelector(
        (state) => state.player,
        shallowEqual,
    );

    useEffect(() => {
        const updateSliceCount = () => {
            const width = window.innerWidth;
            if (width >= 768 && width < 1024) {
                setSliceCountAlbum(4);
                setSliceCountMusic(6);
            } else {
                setSliceCountAlbum(5);
                setSliceCountMusic(9);
            }
        };

        updateSliceCount();
        window.addEventListener('resize', updateSliceCount);

        return () => window.removeEventListener('resize', updateSliceCount);
    }, []);

    // Call API album by categories
    useEffect(() => {
        const categories = ['Best Of 2025'];
        const fetchAlbums = async () => {
            setLoadingAlbums(true);
            try {
                const results = await Promise.all(
                    categories.map((category) =>
                        HomeService.GetAlbumByCategory({
                            categoryName: category,
                        }),
                    ),
                );

                // Convert format to key: [value]
                const updatedAlbums = categories.reduce(
                    (acc, category, index) => {
                        acc[category.replace(/\s+/g, '_')] =
                            results[index].albums;
                        return acc;
                    },
                    {},
                );

                setAlbumsByCategory(updatedAlbums);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoadingAlbums(false);
            }
        };

        fetchAlbums();
    }, []);

    // Call API Suggested Songs
    const fetchSuggestedSongs = async () => {
        setLoadingSuggested(true);
        try {
            const response = await HomeService.GetSuggestedSongs();
            if (response.success) {
                setSuggestedSongs(response.songs);
            } else {
                toast.error('Không thể tải danh sách gợi ý');
            }
        } catch (error) {
            toast.error('Lỗi khi tải danh sách gợi ý');
        } finally {
            setLoadingSuggested(false);
        }
    };

    useEffect(() => {
        fetchSuggestedSongs();
    }, []);

    const handlePlaySong = (music) => {
        if (currentSong?._id !== music._id) {
            // Current song
            dispatch(setCurrentSong(music));

            // Update current new time the song = 0
            dispatch(updateCurrentTime(0));

            // Set Playlist
            dispatch(setPlayList(suggestedSongs));
        } else {
            // Play when music is paused and set current time
            dispatch(playPause({ isPlaying: true, currentTimeSong }));
        }
    };

    // const handleButtonClick = (buttonName) => {
    //     setActiveButton(buttonName);
    // };

    return (
        <div>
            <div className={cx('title')}>
                <div className={cx('title-name')}>Best Of 2025</div>

                <div className={cx('title-view-all')}>
                    <span>Tất Cả</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>

            <ListTopic>
                {loadingAlbums
                    ? Array.from({ length: sliceCountAlbum - 1 }).map(
                          (_, i) => (
                              <SkeletonBox key={i} className="skeleton-topic" />
                          ),
                      )
                    : albumsByCategory.Best_Of_2025?.slice(
                          0,
                          sliceCountAlbum,
                      ).map((album, index) => (
                          <Topic
                              key={album._id}
                              id={album._id}
                              name={album.name}
                              urlImageAlbum={album.urlImageAlbum}
                              aosDelay={index * 200}
                          />
                      ))}
            </ListTopic>

            {/* <div className={cx('title')}>
                <div className={cx('title-name')}>Nhạc hot thịnh hành</div>

                <div className={cx('title-view-all')}>
                    <span>Tất Cả</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>

            <ListTopic>
                <Topic />
                <Topic />
                <Topic />
                <Topic />
                <Topic />
            </ListTopic> */}

            <div className={cx('title')}>
                <div className={cx('title-name')}>Gợi Ý Cho Bạn</div>

                <div className={cx('title-view-all')}>
                    <Button
                        small
                        primary
                        leftIcon={<FontAwesomeIcon icon={faRefresh} />}
                        onClick={fetchSuggestedSongs}
                    >
                        LÀM MỚI
                    </Button>
                </div>
            </div>

            <ListMusic dataAos="fade-right">
                {loadingSuggested
                    ? Array.from({ length: sliceCountMusic }).map((_, i) => (
                          <SkeletonMusic key={i} />
                      ))
                    : suggestedSongs
                          ?.slice(0, sliceCountMusic)
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

            {/*
            <div className={cx('title')}>
                <div className={cx('title-name')}>Chill</div>

                <div className={cx('title-view-all')}>
                    <span>Tất Cả</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>

            <ListTopic>
                <Topic />
                <Topic />
                <Topic />
                <Topic />
                <Topic />
            </ListTopic>

            <div className={cx('title')}>
                <div className={cx('title-name')}>Mới Phát Hành</div>

                <div className={cx('title-view-all', 'menu-title-view-all')}>
                    <span>Tất Cả</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>

            <div className={cx('menu-view')}>
                <Button
                    small
                    primary={activeButton === 'Tất Cả'}
                    outline={activeButton !== 'Tất Cả'}
                    onClick={() => handleButtonClick('Tất Cả')}
                >
                    Tất Cả
                </Button>
                <Button
                    small
                    primary={activeButton === 'Việt Nam'}
                    outline={activeButton !== 'Việt Nam'}
                    onClick={() => handleButtonClick('Việt Nam')}
                >
                    Việt Nam
                </Button>
                <Button
                    small
                    primary={activeButton === 'Quốc Tế'}
                    outline={activeButton !== 'Quốc Tế'}
                    onClick={() => handleButtonClick('Quốc Tế')}
                >
                    Quốc Tế
                </Button>
            </div>

            <ListMusic>
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
                <Music />
            </ListMusic>

            <div className={cx('box-bin-chart')}>
                <h3 className={cx('title-chart')}>#binchart</h3>
                <div className={cx('box-chart-info')}>
                    <div>
                        <div
                            className={cx(
                                'box-top',
                                'chart-music-top1',
                                'box-top-active',
                            )}
                        >
                            <div>
                                <span>1</span>
                            </div>
                            <div>
                                <div>
                                    <Image src={images.music} alt="image" />
                                </div>
                                <div>
                                    <p>Tái sinh</p>
                                    <p>Tùng dương</p>
                                </div>
                            </div>
                            <div>
                                <span>54%</span>
                            </div>
                        </div>
                        <div className={cx('box-top', 'chart-music-top2')}>
                            <div>
                                <span>2</span>
                            </div>
                            <div>
                                <div>
                                    <Image src={images.music} alt="image" />
                                </div>
                                <div>
                                    <p>Tái sinh</p>
                                    <p>Tùng dương</p>
                                </div>
                            </div>
                            <div>
                                <span>54%</span>
                            </div>
                        </div>

                        <div className={cx('box-top', 'chart-music-top3')}>
                            <div>
                                <span>3</span>
                            </div>
                            <div>
                                <div>
                                    <Image src={images.music} alt="image" />
                                </div>
                                <div>
                                    <p>Tái sinh</p>
                                    <p>Tùng dương</p>
                                </div>
                            </div>
                            <div>
                                <span>54%</span>
                            </div>
                        </div>

                        <Button
                            outline
                            small
                            className={cx('btn-view-more-chart')}
                        >
                            Xem thêm
                        </Button>
                    </div>
                    <div>
                        <Chart />
                    </div>
                </div>
            </div> */}

            <div className={cx('partner-music')}>Đối Tác Âm Nhạc</div>

            <div className={cx('list-partner-music')} data-aos="fade-right">
                {loadingAlbums
                    ? Array.from({ length: 16 }).map((_, i) => (
                          <SkeletonPartner key={i} />
                      ))
                    : [
                          images.partner1,
                          images.partner2,
                          images.partner3,
                          images.partner4,
                          images.partner5,
                          images.partner6,
                          images.partner7,
                          images.partner8,
                          images.partner9,
                          images.partner10,
                          images.partner11,
                          images.partner12,
                          images.partner13,
                          images.partner14,
                          images.partner15,
                          images.partner16,
                      ].map((img, i) => (
                          <div className={cx('box-partner-music')} key={i}>
                              <div>
                                  <Image src={img} alt="image" />
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    );
}

export default Explore;
