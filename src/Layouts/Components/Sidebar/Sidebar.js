import classNames from 'classnames/bind';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { LiveRadio, BinChart, Library, Explore, BxhMusic, TopicAndCategory, Rating } from '~/components/Icons/icons';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from '~/components/Modal';
import { Google } from '~/components/Icons';
import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Sidebar() {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <>
            <div className={cx('sidebar')}>
                {/* Logo */}
                <Link to={config.routes.explore}>
                    <div className={cx('logo')}>Bin Music</div>
                </Link>

                {/* Menu */}
                <Menu>
                    <MenuItem title="Khám phá" to={config.routes.explore} icon={<Explore />} />
                    <MenuItem title="Thư viện" to={config.routes.library} icon={<Library />} />
                    <MenuItem title="#binchart" to={config.routes.binChart} icon={<BinChart />} />
                    <MenuItem title="Radio" to={config.routes.radio} icon={<LiveRadio />} />

                    <div className={cx('menu-line')}></div>

                    <MenuItem title="BXH Nhạc Mới" to={config.routes.ratingNewMusic} icon={<BxhMusic />} />
                    <MenuItem title="Chủ Đề & Thể Loại" to={config.routes.topicAndCategory} icon={<TopicAndCategory />} />
                    <MenuItem title="Top 100" to={config.routes.top100} icon={<Rating />} />
                </Menu>

                {/* login suggestion */}
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

                {/* Create Playlist */}
                <div className={cx('create-playlist')}>
                    <FontAwesomeIcon icon={faPlus} />
                    <p>Tạo Playlist mới</p>
                </div>
            </div>
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
        </>
    );
}

export default Sidebar;
