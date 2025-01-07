import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './ListMusic.module.scss';

const cx = classNames.bind(styles);

function ListMusic({ children }) {
    return <div className={cx('list-music')}>{children}</div>;
}

ListMusic.propTypes = {
    children: PropTypes.node,
};

export default ListMusic;
