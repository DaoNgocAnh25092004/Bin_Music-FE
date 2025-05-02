import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import styles from './ListMusic.module.scss';
import * as FavoriteService from '~/Services/FavoriteService';

const cx = classNames.bind(styles);
function ListMusic({ children, col_1, dataAos, playlist }) {
    const { id: userId } = useSelector((state) => state.user);
    const [favoriteSongIds, setFavoriteSongIds] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await FavoriteService.GetFavoriteSongsByUser(
                    userId,
                );
                const ids = data.songs.map((song) => song._id);
                setFavoriteSongIds(ids);
            } catch (err) {
                console.error('Lỗi khi lấy danh sách yêu thích:', err);
            }
        };

        if (userId) {
            fetchFavorites();
        }
    }, [userId]);

    return (
        <div
            data-aos={dataAos}
            className={cx(
                'list-music',
                { 'col-1': col_1 },
                { 'play-list': playlist },
            )}
        >
            {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                    favoriteSongIds,
                }),
            )}
        </div>
    );
}

ListMusic.propTypes = {
    children: PropTypes.node,
    col_1: PropTypes.bool,
};

export default ListMusic;
