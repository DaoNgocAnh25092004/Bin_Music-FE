import classNames from 'classnames/bind';
import { memo } from 'react';

import Header from '~/Layouts/Components/Header';
import DefaultSidebar from '~/Layouts/Components/DefaultSidebar';
import Control from '~/Layouts/Components/Control';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('app')}>
            {/* Header */}
            <Header />

            {/* Sidebar */}
            <DefaultSidebar />

            {/* Content */}

            <main className={cx('content')}>
                <div className={cx('scroll-content')}>{children}</div>
            </main>
            {/* Control */}
            <Control />
        </div>
    );
}

export default memo(DefaultLayout);
