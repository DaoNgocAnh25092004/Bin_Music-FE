import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './AdminSidebar.module.scss';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { faImages } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function AdminSidebar() {
    return (
        <aside className={cx('sidebar')}>
            {/* Logo */}
            <Link to={config.routes.explore}>
                <div className={cx('logo')}>Bin Music</div>
            </Link>

            <Menu>
                <MenuItem
                    title="Âm nhạc"
                    to={config.routes.musicAdmin}
                    icon={<FontAwesomeIcon icon={faMusic} />}
                />
                <MenuItem
                    title="Album"
                    to={config.routes.albumAdmin}
                    icon={<FontAwesomeIcon icon={faImages} />}
                />
                <MenuItem
                    title="Nghệ sĩ"
                    to={config.routes.artist}
                    iconImg={images.iconArtist}
                    iconImgActive={images.iconArtistActive}
                />
            </Menu>
        </aside>
    );
}

export default AdminSidebar;
