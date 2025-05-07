import className from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBan,
    faGear,
    faRightFromBracket,
    faStore,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Search from '../Search';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Login from '~/components/Login';
import * as GoogleService from '~/Services/GoogleService';
import { logout } from '~/redux/slices/userSlice';

const cx = className.bind(styles);

function Header() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isTippyVisible, setTippyVisible] = useState(false);
    const userInfo = useSelector((state) => state.user);
    const isLogin = userInfo.isLogin;
    const isAdmin = userInfo.role === 'admin';
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle logout
    const handleLogout = async () => {
        try {
            // Logout google
            await GoogleService.LogoutGoogle();

            // Logout user info in redux
            dispatch(logout());

            // Close tippy
            setTippyVisible(false);

            // Navigate to home page
            navigate('/');
        } catch (error) {
            console.log('Logout error: ', error);
        }
    };

    // Render box login
    const renderResult = (attrs) => (
        <div className={cx('container_user')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                {/* Show button login */}
                {!isLogin && (
                    <Button
                        onClick={() => {
                            setModalOpen(true);
                            setTippyVisible(false);
                        }}
                        className={cx('btn-login')}
                        primary
                    >
                        Đăng nhập
                    </Button>
                )}

                {/* Show info when login success */}

                {isLogin && (
                    <>
                        <div className={cx('box-user-info')}>
                            <div>
                                <Image
                                    src={userInfo.avatar || images.noUser}
                                    alt={userInfo.name || 'User Avatar'}
                                />
                            </div>
                            <div>
                                <h4>{userInfo.name}</h4>
                                <p>BASIC</p>
                            </div>
                        </div>

                        <Button className={cx('btn-upgrade')} primary>
                            Nâng cấp tài khoản
                        </Button>
                    </>
                )}

                <p>Đăng ký gói</p>
                {['PLUS', 'PREMIUM'].map((type, index) => (
                    <div
                        key={index}
                        className={cx(
                            'box-package',
                            `box-${type.toLowerCase()}`,
                        )}
                    >
                        <div>
                            <p>Bin Music</p>
                            <span>{type}</span>
                        </div>
                        <h5>
                            {type === 'PLUS'
                                ? 'Chỉ từ 13.000đ/tháng'
                                : 'Chỉ từ 41.000đ/tháng'}
                        </h5>
                        <p>
                            {type === 'PLUS'
                                ? 'Nghe nhạc với chất lượng cao nhất, không quảng cáo'
                                : 'Toàn bộ đặc quyền Plus cùng kho nhạc Premium'}
                        </p>
                        <Button
                            className={cx(
                                'btn-learn-more',
                                type === 'PREMIUM' && 'btn-premium',
                            )}
                            small
                            primary
                        >
                            Tìm hiểu thêm
                        </Button>
                    </div>
                ))}

                {isLogin && (
                    <>
                        <div className={cx('line')}></div>
                        <div className={cx('box-individual')}>
                            <p>Cá nhân</p>
                            <Button leftIcon={<FontAwesomeIcon icon={faBan} />}>
                                Danh sách chặn
                            </Button>

                            {isAdmin && (
                                <Button
                                    onClick={() => navigate('/admin/music')}
                                    leftIcon={
                                        <FontAwesomeIcon icon={faStore} />
                                    }
                                >
                                    Trang quản trị
                                </Button>
                            )}
                        </div>

                        <div className={cx('line')}></div>
                        <div className={cx('box-logout')}>
                            <Button
                                onClick={handleLogout}
                                leftIcon={
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                    />
                                }
                            >
                                Đăng xuất
                            </Button>
                        </div>
                    </>
                )}
            </PopperWrapper>
        </div>
    );

    return (
        <header className={cx('header')}>
            <Login isOpen={isModalOpen} setIsOpen={setModalOpen} />

            <Search />

            <div className={cx('tools')}>
                <Button large primary className={cx('btn-upgrade')}>
                    Nâng cấp tài khoản
                </Button>

                <div className={cx('setting')}>
                    <FontAwesomeIcon
                        className={cx('icon-setting')}
                        icon={faGear}
                    />
                </div>

                <Tippy
                    interactive
                    visible={isTippyVisible}
                    onClickOutside={() => setTippyVisible(false)}
                    delay={[0, 700]}
                    placement="bottom-end"
                    render={renderResult}
                >
                    <div
                        className={cx('user')}
                        onClick={() => setTippyVisible(!isTippyVisible)}
                    >
                        <Image
                            src={userInfo.avatar || images.noUser}
                            alt={userInfo.name || 'User Avatar'}
                        />
                    </div>
                </Tippy>
            </div>
        </header>
    );
}

export default Header;
