import className from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import Search from '../Search';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Modal from '~/components/Modal';
import { Google } from '~/components/Icons';

const cx = className.bind(styles);

function Header() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isTippyVisible, setTippyVisible] = useState(false);
    const currentUser = true;

    // Render user
    const renderResult = (attrs) => (
        <div className={cx('container_user')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
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

                <p>Đăng ký gói</p>
                <div className={cx('box-package', 'box-plus')}>
                    <div>
                        <p>Bin Music</p>
                        <span>PLUS</span>
                    </div>
                    <h5>Chỉ từ 13.000đ/tháng</h5>
                    <p>Nghe nhạc với chất lượng cao nhất, không quảng cáo</p>
                    <Button className={cx('btn-learn-more')} small primary>
                        Tìm hiểu thêm
                    </Button>
                </div>

                <div className={cx('box-package', 'box-premium')}>
                    <div>
                        <p>Bin Music</p>
                        <span>PREMIUM</span>
                    </div>
                    <h5>Chỉ từ 41.000đ/tháng</h5>
                    <p>Toàn bộ đặc quyền Plus cùng kho nhạc Premium</p>
                    <Button className={cx('btn-learn-more', 'btn-premium')} small primary>
                        Tìm hiểu thêm
                    </Button>
                </div>
            </PopperWrapper>
        </div>
    );

    return (
        <header className={cx('header')}>
            <Modal className={cx('box-login')} isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className={cx('background-login')}>
                    <Image src={images.backGroundLogin} alt="Background login" />
                </div>

                <h3>Đăng nhâp Bin Music</h3>

                <Button className={cx('btn-google')} outline leftIcon={<Google />}>
                    Đăng nhập với Google
                </Button>

                <p>Bằng cách đăng nhập tài khoản, bạn đã đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của Bin Music</p>
            </Modal>

            <Search />
            <div className={cx('tools')}>
                <Button large primary>
                    Nâng cấp tài khoản
                </Button>

                <div className={cx('setting')}>
                    <FontAwesomeIcon className={cx('icon-setting')} icon={faGear} />
                </div>

                <Tippy
                    interactive
                    visible={isTippyVisible}
                    onClickOutside={() => setTippyVisible(false)}
                    delay={[0, 700]}
                    placement="bottom-end"
                    render={renderResult}
                    hideOnClick={false}
                >
                    {currentUser ? (
                        <div className={cx('user')} onClick={() => setTippyVisible(!isTippyVisible)}>
                            <Image src={images.noUser} alt="avatar" />
                        </div>
                    ) : (
                        <div className={cx('user')} onClick={() => setTippyVisible(!isTippyVisible)}>
                            <Image src={images.noUser} alt="avatar" />
                        </div>
                    )}
                </Tippy>
            </div>
        </header>
    );
}

export default Header;
