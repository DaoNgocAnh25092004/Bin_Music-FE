import Header from '~/Layouts/Components/Header';
import classNames from 'classnames/bind';

import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>{children}</div>
        </>
    );
}

export default HeaderOnly;
