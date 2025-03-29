import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('search')}>
            <FontAwesomeIcon className={cx('icon-search')} icon={faSearch} />

            <input className={cx('input')} type="text" placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..." />
        </div>
    );
}

export default Search;
