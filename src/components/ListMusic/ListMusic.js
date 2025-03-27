import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './ListMusic.module.scss';

const cx = classNames.bind(styles);

function ListMusic({ children, col_1 }) {
    return (
        <div className={cx('list-music', { 'col-1': col_1 })}>{children}</div>
    );
}

ListMusic.propTypes = {
    children: PropTypes.node,
    col_1: PropTypes.bool,
};

export default ListMusic;
