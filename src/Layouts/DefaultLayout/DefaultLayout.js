import classNames from 'classnames/bind';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Header from '~/Layouts/Components/Header';
import Sidebar from '~/Layouts/Components/Sidebar';
import Control from '~/Layouts/Components/Control';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('app')}>
            {/* Header */}
            <Header />

            {/* Sidebar */}
            <Sidebar />

            {/* Content */}

            <div className={cx('content')}>
                <PerfectScrollbar style={{ height: '100%' }}>{children}</PerfectScrollbar>
            </div>
            {/* Control */}
            <Control />
        </div>
    );
}

export default DefaultLayout;
