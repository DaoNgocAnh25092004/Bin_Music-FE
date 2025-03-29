import classNames from 'classnames/bind';
import { memo, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from '~/Layouts/Components/Header';
import DefaultSidebar from '~/Layouts/Components/DefaultSidebar';
import Control from '~/Layouts/Components/Control';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });

        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        // Hàm cập nhật AOS khi cuộn
        const handleScroll = () => {
            AOS.refresh(); // Buộc AOS tính toán lại vị trí các phần tử
        };

        scrollContainer.addEventListener('scroll', handleScroll);

        // Dọn dẹp sự kiện khi component unmount
        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={cx('app')}>
            {/* Header */}
            <Header />

            {/* Sidebar */}
            <DefaultSidebar />

            {/* Content */}
            <main className={cx('content')}>
                <div
                    ref={scrollRef}
                    className={cx('scroll-content')}
                    style={{ overflowY: 'scroll', height: '100vh' }}
                >
                    {children} {/* Nội dung trang */}
                </div>
            </main>

            {/* Control */}
            <Control />
        </div>
    );
}

export default memo(DefaultLayout);
