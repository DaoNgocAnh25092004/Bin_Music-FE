import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, iconActive, iconImg, iconImgActive }) {
    const renderIcon = (isActive = false) => {
        if (iconImg) {
            const imgToRender =
                isActive && iconImgActive ? iconImgActive : iconImg;

            return (
                <div className={cx('icon-img')}>
                    <img src={imgToRender} alt={title} />
                </div>
            );
        } else {
            const iconToRender = isActive && iconActive ? iconActive : icon;
            return <div className={cx('icon')}>{iconToRender}</div>;
        }
    };

    return (
        <NavLink
            to={to}
            className={(nav) => cx('menu-item', { active: nav.isActive })}
        >
            {(nav) => (
                <>
                    {renderIcon(nav.isActive)}
                    <span className={cx('title')}>{title}</span>
                </>
            )}
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.element,
    iconActive: PropTypes.element,
    iconImg: PropTypes.string,
    iconImgActive: PropTypes.string,
};

export default MenuItem;
