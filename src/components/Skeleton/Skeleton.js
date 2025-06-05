import React from 'react';
import classNames from 'classnames/bind';
import styles from './Skeleton.module.scss';

const cx = classNames.bind(styles);

export function SkeletonBox({ className }) {
    return <div className={cx('skeleton', className)} />;
}

export function SkeletonMusic() {
    return (
        <div className={cx('skeleton-music')}>
            <div className={cx('skeleton', 'skeleton-img')} />
            <div className={cx('skeleton', 'skeleton-title')} />
            <div className={cx('skeleton', 'skeleton-artist')} />
        </div>
    );
}

export function SkeletonPartner() {
    return (
        <div className={cx('box-partner-music')}>
            <div>
                <div className={cx('skeleton', 'skeleton-partner-img')} />
            </div>
        </div>
    );
}
