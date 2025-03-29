import classNames from 'classnames/bind';

import styles from './AdminLayout.module.scss';
import AdminSidebar from '~/Layouts/Components/AdminSidebar';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('container')}>
            <AdminSidebar />
            <main className={cx('content')}>{children}</main>
        </div>
    );
}

export default AdminLayout;
