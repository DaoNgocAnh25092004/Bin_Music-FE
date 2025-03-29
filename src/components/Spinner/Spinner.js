import classNames from 'classnames/bind';

import Styles from './Spinner.module.scss';

const cx = classNames.bind(Styles);

function Spinner() {
    return (
        <div className={cx('container-spinner')}>
            <div className={cx('screen-blur')}></div>
            <div className={cx('hourglassBackground')}>
                <div className={cx('hourglassContainer')}>
                    <div className={cx('hourglassCurves')}></div>
                    <div className={cx('hourglassCapTop')}></div>
                    <div className={cx('hourglassGlassTop')}></div>
                    <div className={cx('hourglassSand')}></div>
                    <div className={cx('hourglassSandStream')}></div>
                    <div className={cx('hourglassCapBottom')}></div>
                    <div className={cx('hourglassGlass')}></div>
                </div>
            </div>
        </div>
    );
}

export default Spinner;
