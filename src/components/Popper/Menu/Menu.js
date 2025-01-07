import PropTypes from 'prop-types';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItems from './MenuItems';
import Header from './header';

const cx = classNames.bind(styles);

const defaultFc = () => {};

function MenuHeader({ children, items = [], hideOnClick = false, onClickHandle = defaultFc }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItems
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onClickHandle(item);
                        }
                    }}
                />
            );
        });
    };

    // Back to previous menu
    const handlBack = () => {
        setHistory((prev) => prev.slice(0, history.length - 1));
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={handlBack} />}
                <div className={cx('menu-body')}> {renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    //Quay về menu chính
    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy interactive delay={[0, 700]} placement="bottom-end" hideOnClick={hideOnClick} onHide={handleReset} render={renderResult}>
            {children}
        </Tippy>
    );
}

MenuHeader.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onClickHandle: PropTypes.func,
};

export default MenuHeader;
