import classNames from 'classnames/bind';

import styles from './AlbumAdmin.module.scss';
import Button from '~/components/Button';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AlbumAdmin() {
    return (
        <div className={cx('container')}>
            <Button
                borderRadius4
                animation
                to={config.routes.categoryAlbumAdmin}
                primary
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
            >
                Thêm thể loại
            </Button>

            <Button
                borderRadius4
                animation
                to={config.routes.albumAdminCreate}
                primary
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
            >
                Thêm album
            </Button>
        </div>
    );
}

export default AlbumAdmin;
