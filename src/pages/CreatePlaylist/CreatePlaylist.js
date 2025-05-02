import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import styles from './CreatePlaylist.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMusic,
    faPlus,
    faWandSparkles,
} from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import * as PLaylist from '~/Services/PLaylistService';
import { useGenericMutation } from '~/hooks/useMutationHook';

const cx = classNames.bind(styles);

function CreatePlaylist() {
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { id } = useSelector((state) => state.user);
    // Mutation create playlist
    const mutationCreatePlaylist = useGenericMutation((data) =>
        PLaylist.createPlaylist(data),
    );

    const handleAddPlaylist = async () => {
        if (!name.trim()) {
            setError('Tên playlist không được để trống.');
            return;
        }

        const playlistData = {
            userId: id,
            name,
            songs: [], // hiện tại không có generatedPlaylist nên để mảng rỗng
        };

        mutationCreatePlaylist.mutate(playlistData, {
            onSuccess: () => {
                setName('');
                setError('');
                setIsShow(false);
                navigate('/library');
                toast.success('Playlist đã được tạo thành công!');
            },
            onError: (error) => {
                console.error('Error saving playlist:', error);
            },
        });
    };

    return (
        <div className={cx('container')}>
            <div className={cx('box-btn')} onClick={() => setIsShow(!isShow)}>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faMusic} />
                    </div>
                    <div>
                        <h4 className={cx('title')}>Playlist mặc định</h4>
                        <p>Tạo playlist của riêng bạn</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
                <div
                    className={cx('box-ai')}
                    onClick={() => navigate('/create-playlist-ai')}
                >
                    <div>
                        <FontAwesomeIcon icon={faWandSparkles} />
                    </div>
                    <div>
                        <h4 className={cx('title')}>Playlist thông minh</h4>
                        <p>Tạo playlist bằng AI</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
            </div>

            {isShow && (
                <div className={cx('box-create-playlist')}>
                    <input
                        type="text"
                        placeholder="Nhập tên playlist"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError(''); // reset error nếu người dùng gõ lại
                        }}
                        className={cx('input')}
                    />
                    {error && <p className={cx('error')}>{error}</p>}

                    <Button
                        widthFull
                        borderRadius4
                        primary
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={handleAddPlaylist}
                        className={cx('btn-create')}
                    >
                        Tạo playlist
                    </Button>
                </div>
            )}
        </div>
    );
}

export default CreatePlaylist;
