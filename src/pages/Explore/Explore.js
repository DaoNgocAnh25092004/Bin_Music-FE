import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';

import Styles from './Explore.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ListTopic, { Topic } from './ListTopic';
// import ListMusic, { Music } from '../../components/ListMusic';
// import Button from '~/components/Button';
// import Chart from './Chart';
import Image from '~/components/Image';
import images from '~/assets/images';
import * as HomeService from '~/Services/HomeService';

const cx = classNames.bind(Styles);

function Explore() {
    // const [activeButton, setActiveButton] = useState('Tất Cả');
    const [albumsByCategory, setAlbumsByCategory] = useState({});

    useEffect(() => {
        const categories = ['Best Of 2025'];

        const fetchAlbums = async () => {
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
            }
        };

        fetchAlbums();
    }, []);

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
                {albumsByCategory.Best_Of_2025?.slice(0, 5).map((album) => (
                    <Topic
                        key={album._id}
                        id={album._id}
                        name={album.name}
                        urlImageAlbum={album.urlImageAlbum}
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
            {/* 
            <div className={cx('title')}>
                <div className={cx('title-name')}>Gợi Ý Cho Bạn</div>

                <div className={cx('title-view-all')}>
                    <Button
                        small
                        primary
                        leftIcon={<FontAwesomeIcon icon={faRefresh} />}
                    >
                        LÀM MỚI
                    </Button>
                </div>
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

            <div className={cx('list-partner-music')}>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner1} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner2} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner3} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner4} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner5} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner6} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner7} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner8} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner9} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner10} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner11} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner12} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner13} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner14} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner15} alt="image" />
                    </div>
                </div>
                <div className={cx('box-partner-music')}>
                    <div>
                        <Image src={images.partner16} alt="image" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Explore;
