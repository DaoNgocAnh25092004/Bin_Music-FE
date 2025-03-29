import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ListTopic.module.scss';

const cx = classNames.bind(styles);

function ListTopic({ children }) {
    return <div className={cx('list-topic')}>{children}</div>;
}

ListTopic.propTypes = {
    children: PropTypes.node,
};

export default ListTopic;
