import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Control.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faEllipsis,
    faForwardStep,
    faMicrophoneLines,
    faRectangleList,
    faRepeat,
    faShuffle,
    faVolumeHigh,
    faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Control() {
    const [valueAudio, setValueAudio] = useState(0);
    const [valueVolume, setValueVolume] = useState(0);

    const handleInputChange = (e) => {
        setValueAudio(e.target.value);
    };

    const handleVolumeChange = (e) => {
        setValueVolume(e.target.value);
    };

    const percentageVolume = (valueVolume / 100) * 100;

    const percentageAudio = (valueAudio / 100) * 100;

    return (
        <div className={cx('container')}>
            <div className={cx('box-left')}>
                <div className={cx('box-left-img')}>
                    <Image src={images.music} alt="music" />
                </div>
                <div className={cx('box-left-info')}>
                    <p>Chúng ta của hiện tại ngày mai và tương lai</p>
                    <p>Trịnh Thăng Bình, Đào Ngọc Anh ATP, HIEUTHUHAI</p>
                </div>
                <div className={cx('box-left-control')}>
                    <div>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>
            <div className={cx('box-center')}>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faShuffle} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCirclePlay} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faRepeat} />
                    </div>
                </div>
                <div>
                    <span>00:00</span>
                    <input
                        className={cx('audio-slider')}
                        type="range"
                        value={valueAudio}
                        step="1"
                        min="0"
                        max="100"
                        onChange={handleInputChange}
                        style={{
                            background: `linear-gradient(to right, var(--blue-light-color) ${percentageAudio}%, var(--gray-medium-color) ${percentageAudio}%)`,
                        }}
                    />
                    <span>03:23</span>
                </div>
            </div>
            <div className={cx('box-right')}>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faMicrophoneLines} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faWindowRestore} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faVolumeHigh} />
                        <input
                            className={cx('volume-slider')}
                            type="range"
                            value={valueVolume}
                            step="1"
                            min="0"
                            max="100"
                            onChange={handleVolumeChange}
                            style={{
                                background: `linear-gradient(to right, var(--blue-light-color) ${percentageVolume}%, var(--gray-medium-color) ${percentageVolume}%)`,
                            }}
                        />
                    </div>
                </div>

                <div>
                    <FontAwesomeIcon icon={faRectangleList} />
                </div>
            </div>
        </div>
    );
}

export default Control;
