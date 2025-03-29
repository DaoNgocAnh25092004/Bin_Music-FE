import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './DefaultSidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    LiveRadio,
    BinChart,
    Library,
    Explore,
    BxhMusic,
    TopicAndCategory,
    Rating,
} from '~/components/Icons/icons';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Login from '~/components/Login';

const cx = classNames.bind(styles);

function DefaultSidebar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const checkLogin = useSelector((state) => state.user.isLogin);

    return (
        <>
            <aside className={cx('sidebar')}>
                {/* Logo */}
                <Link to={config.routes.explore}>
                    <div className={cx('logo')}>Bin Music</div>
                </Link>

                {/* Menu */}
                <Menu>
                    <MenuItem
                        title="Khám phá"
                        to={config.routes.explore}
                        icon={<Explore />}
                    />
                    {checkLogin && (
                        <MenuItem
                            title="Thư viện"
                            to={config.routes.library}
                            icon={<Library />}
                        />
                    )}
                    <MenuItem
                        title="#binchart"
                        to={config.routes.binChart}
                        icon={<BinChart />}
                    />
                    <MenuItem
                        title="Radio"
                        to={config.routes.radio}
                        icon={<LiveRadio />}
                    />

                    <div className={cx('menu-line')}></div>

                    <MenuItem
                        title="BXH Nhạc Mới"
                        to={config.routes.ratingNewMusic}
                        icon={<BxhMusic />}
                    />
                    <MenuItem
                        title="Chủ Đề & Thể Loại"
                        to={config.routes.topicAndCategory}
                        icon={<TopicAndCategory />}
                    />
                    <MenuItem
                        title="Top 100"
                        to={config.routes.top100}
                        icon={<Rating />}
                    />
                </Menu>

                {/* login suggestion */}
                {!checkLogin && (
                    <div className={cx('login-suggestion')}>
                        <p>Đăng nhập để khám phá playlist dành riêng cho bạn</p>
                        <Button
                            onClick={() => {
                                setModalOpen(true);
                            }}
                            small
                            outline
                        >
                            Đăng nhập
                        </Button>
                    </div>
                )}

                {/* Create Playlist */}
                {checkLogin && (
                    <div className={cx('create-playlist')}>
                        <FontAwesomeIcon icon={faPlus} />
                        <p>Tạo Playlist mới</p>
                    </div>
                )}
            </aside>
            <Login isOpen={isModalOpen} setIsOpen={setModalOpen} />
        </>
    );
}

export default DefaultSidebar;
