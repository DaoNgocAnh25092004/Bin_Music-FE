import { memo } from 'react';
import classNames from 'classnames/bind';

import styles from './VolumeSlider.module.scss';

const cx = classNames.bind(styles);

function VolumeSlider({ value, onChange, percentageVolume }) {
    return (
        <input
            className={cx('volume-slider')}
            type="range"
            value={value}
            step="1"
            min="0"
            max="100"
            onChange={onChange}
            style={{
                background: `linear-gradient(to right, var(--blue-light-color) ${percentageVolume}%, var(--gray-medium-color) ${percentageVolume}%)`,
            }}
        />
    );
}

export default memo(VolumeSlider);
