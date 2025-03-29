import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Menu.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItems({ data, onClick }) {
    const account = useSelector((state) => state.account);

    const classes = cx('menu-item', { separate: data.separate }, 'isAdmin');

    if (data.isAdmin && account.role === 'user') {
        return null;
    }

    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

MenuItems.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItems;
