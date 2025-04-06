import classNames from 'classnames/bind';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { toast } from 'react-toastify';

import styles from './AlbumAdminCreate.module.scss';
import BoxInput from '~/components/BoxInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faImage,
    faImages,
    faPlus,
    faSearch,
    faSpinner,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import useDebounce from '~/hooks/useDebounce';
import * as musicsService from '~/Services/MusicAdminService';
import Image from '~/components/Image';
import { useGenericMutation } from '~/hooks/useMutationHook';
import * as CategoryAdminService from '~/Services/CategoryAdminService';
import * as AlbumAdminService from '~/Services/AlbumAdminService';

const cx = classNames.bind(styles);

function AlbumAdminCreate() {
    const [forms, setForms] = useState({
        name: '',
        search: '',
        urlImageAlbum: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [resultResearch, setResultResearch] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [listMusic, setListMusic] = useState([]);
    const [loadingCreateAlbum, setLoadingCreateAlbum] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const urlImageAlbumRef = useRef();

    const debouncedSearchValue = useDebounce(forms.search, 600);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await CategoryAdminService.GetListCategoryAlbum();
                setCategories(data);
            } catch (error) {
                toast.error('Lỗi khi lấy danh sách thể loại album');
            }
        };
        fetchCategories();
    }, []);

    const mutationCreateAlbum = useGenericMutation((data) =>
        AlbumAdminService.CreateAlbum(data),
    );

    useEffect(() => {
        if (!debouncedSearchValue) {
            setResultResearch([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await musicsService.searchMusic({
                page: 1,
                limit: 5,
                name: debouncedSearchValue,
                artist: debouncedSearchValue,
            });
            setResultResearch(result.data);

            setLoading(false);
        };

        fetchApi();
    }, [debouncedSearchValue]);

    useEffect(() => {
        return () => {
            forms.urlImageAlbum && URL.revokeObjectURL(forms.urlImageAlbum);
        };
    }, [forms.urlImageAlbum]);

    const handleChangeInput = useCallback(
        (e) => {
            const { value, name, type, files } = e.target;

            if (name === 'search') {
                setLoading(false);
            }

            if (type === 'file' && files.length > 0) {
                const inputFile = files[0];
                setErrors((prev) => ({
                    ...prev,
                    [name]: validateInput(name, inputFile),
                }));

                inputFile.preview = URL.createObjectURL(inputFile);

                setForms((prev) => ({
                    ...prev,
                    [name]: inputFile,
                }));
            } else {
                setForms((prev) => ({
                    ...prev,
                    [name]: value.trimStart(),
                }));

                setErrors((prev) => ({
                    ...prev,
                    [name]: validateInput(name, value),
                }));
            }
        },
        // eslint-disable-next-line
        [],
    );

    const validateInput = (name, value) => {
        const rule = validationValues[name];

        if (!rule) return '';

        if (rule.required && !value) {
            return rule.emptyMessage;
        }

        if (rule.regex && !rule.regex.test(value)) {
            return rule.errorMessage;
        }

        // Check file type and size (Only input type is file)
        if (value instanceof File) {
            if (rule.fileType && !rule.fileType.includes(value.type)) {
                return 'Định dạng file không hợp lệ.';
            }
            if (rule.maxSize && value.size > rule.maxSize) {
                return `File quá lớn. Giới hạn ${
                    rule.maxSize / (1024 * 1024)
                }MB.`;
            }
        }

        return '';
    };

    const validationValues = useMemo(
        () => ({
            name: {
                required: true,
                emptyMessage: 'Tên album không được để trống.',
            },
            search: {
                regex: /^[a-zA-ZÀ-Ỹà-ỹ0-9\s]*$/,
                errorMessage: 'Tên bài hát không được chứa ký tự đặc biệt.',
            },
            urlImageAlbum: {
                required: true,
                emptyMessage: 'Vui lòng chọn một file hình ảnh.',
                fileType: ['image/jpeg', 'image/png', 'image/jpg'],
                maxSize: 10 * 1024 * 1024,
                errorMessage:
                    'File không hợp lệ. Chỉ chấp nhận JPEG/PNG/JPG và tối đa 5MB.',
            },
        }),
        [],
    );

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleAddMusic = (song) => {
        setListMusic((prev) => {
            const isDuplicate = prev.some((item) => item._id === song._id);

            if (isDuplicate) {
                toast.error('Bài hát đã có trong danh sách!');
                return prev;
            }

            return [...prev, song];
        });
        setForms((prev) => {
            return {
                ...prev,
                search: '',
            };
        });

        if (listMusic.length >= 1) {
            setErrors((prev) => ({
                ...prev,
                listMusic: '',
            }));
        }

        setShowResult(false);
    };

    const handleRemoveMusic = (index) => {
        setListMusic((prev) => {
            const updatedList = prev.filter((_, i) => i !== index);
            if (updatedList.length < 2) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    listMusic: 'Phải có ít nhất 2 bài hát trong 1 album.',
                }));
            }
            return updatedList;
        });
    };

    const handleRadioChange = (id) => {
        setSelectedGenre(id);
        setErrors((prev) => ({
            ...prev,
            categories: '',
        }));
    };

    const validateForm = () => {
        const errors = {};

        Object.keys(forms).forEach((field) => {
            const errorMessage = validateInput(field, forms[field]);

            if (errorMessage) {
                errors[field] = errorMessage;
            }
        });

        if (listMusic.length < 2) {
            errors.listMusic = 'Phải có ít nhất 2 bài hát trong 1 album.';
        }

        if (selectedGenre === null) {
            errors.categories = 'Bạn cần chọn 1 thể loại.';
        }

        return errors;
    };

    const handleAddAlbum = () => {
        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const formData = new FormData();

        formData.append('name', forms.name);
        formData.append('urlImageAlbum', forms.urlImageAlbum);
        formData.append(
            'listMusic',
            JSON.stringify(listMusic.map((song) => song._id)),
        );
        formData.append('category', selectedGenre);

        setLoadingCreateAlbum(true);

        mutationCreateAlbum.mutate(formData, {
            onSuccess: () => {
                toast.success('Thêm album thành công');

                setForms({
                    name: '',
                    search: '',
                    urlImageAlbum: null,
                });

                setListMusic([]);

                setSelectedGenre(null);

                urlImageAlbumRef.current.value = '';

                setLoadingCreateAlbum(false);
            },

            onError: (error) => {
                toast.error(error.response?.data.message || error.message);
                setLoadingCreateAlbum(false);
            },
        });
    };

    return (
        <div className={cx('container')}>
            <BoxInput
                label="Tên album"
                name="name"
                placeholder="Nhập tên album..."
                icon={<FontAwesomeIcon icon={faImages} />}
                error={errors.name}
                value={forms.name}
                onChange={handleChangeInput}
            />

            <div className={cx('box-categories')}>
                <label>Thể loại</label>
                <div className={cx('categories')}>
                    {categories.map((category, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                id={`category-${index}`}
                                checked={category._id === selectedGenre}
                                onChange={() => handleRadioChange(category._id)}
                            />
                            <label htmlFor={`category-${index}`}>
                                {category.name}
                            </label>
                        </div>
                    ))}

                    {errors.categories && (
                        <p className={cx('error')}>{errors.categories}</p>
                    )}
                </div>
            </div>

            <BoxInput
                label="Hình bìa album"
                name="urlImageAlbum"
                ref={urlImageAlbumRef}
                type="file"
                placeholder="Chọn file ảnh bìa của bạn"
                icon={<FontAwesomeIcon icon={faImage} />}
                error={errors.urlImageAlbum}
                onChange={handleChangeInput}
            />

            {!errors.urlImageAlbum && forms.urlImageAlbum && (
                <div className={cx('img-album')}>
                    <Image
                        src={forms.urlImageAlbum?.preview}
                        alt="Image album preview"
                    />
                </div>
            )}

            <div className={cx('box-search')}>
                <HeadlessTippy
                    interactive
                    visible={showResult}
                    onClickOutside={handleHideResult}
                    delay={[0, 700]}
                    placement="bottom"
                    appendTo={() => document.body}
                    render={(attrs) => (
                        <div
                            className={cx('box-result', {
                                'fade-in': showResult,
                            })}
                            tabIndex="-1"
                            {...attrs}
                        >
                            {loading ? (
                                <div className={cx('loading-box')}>
                                    <FontAwesomeIcon icon={faSpinner} />
                                </div>
                            ) : resultResearch.length > 0 ? (
                                resultResearch.map((song, index) => (
                                    <div
                                        key={index}
                                        className={cx('result-item')}
                                        onClick={() => handleAddMusic(song)}
                                    >
                                        <div className={cx('box-img')}>
                                            <Image
                                                src={song.thumbnailUrl}
                                                alt={song.name}
                                            />
                                        </div>
                                        <div className={cx('box-info')}>
                                            <p className={cx('name')}>
                                                {song.name}
                                            </p>
                                            <p className={cx('artist')}>
                                                {song.listArtist.map(
                                                    (artist, index) => (
                                                        <span key={index}>
                                                            {artist.name}
                                                            {index <
                                                            song.listArtist
                                                                .length -
                                                                1
                                                                ? ', '
                                                                : ''}
                                                        </span>
                                                    ),
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={cx('no-result')}>
                                    Không tìm thấy bài hát nào
                                </p>
                            )}
                        </div>
                    )}
                >
                    <BoxInput
                        label="Tìm kiếm bài hát"
                        name="search"
                        placeholder="Nhập tên bài hát..."
                        icon={
                            loading ? (
                                <FontAwesomeIcon
                                    className={cx('icon-spinner')}
                                    icon={faSpinner}
                                />
                            ) : (
                                <FontAwesomeIcon icon={faSearch} />
                            )
                        }
                        error={errors.search}
                        value={forms.search}
                        onFocus={() => setShowResult(true)}
                        onChange={handleChangeInput}
                    />
                </HeadlessTippy>

                <Button
                    animation
                    primary
                    borderRadius4
                    leftIcon={<FontAwesomeIcon icon={faPlus} />}
                    className={cx('btn-add-album')}
                    onClick={handleAddAlbum}
                    disabled={loadingCreateAlbum}
                >
                    Thêm bài hát vào album
                </Button>
            </div>

            {listMusic.length > 0 && (
                <div className={cx('box-music')}>
                    <p className={cx('title-box-music')}>Danh sách bài hát</p>

                    <div className={cx('list-music')}>
                        {listMusic.map((song, index) => (
                            <div key={index} className={cx('music-item')}>
                                <div className={cx('box-img')}>
                                    <Image
                                        src={song.thumbnailUrl}
                                        alt={song.name}
                                    />
                                </div>
                                <div className={cx('box-info')}>
                                    <p className={cx('name')}>{song.name}</p>
                                    <p className={cx('artist')}>
                                        {song.listArtist.map(
                                            (artist, index) => (
                                                <span key={index}>
                                                    {artist.name}
                                                    {index <
                                                    song.listArtist.length - 1
                                                        ? ', '
                                                        : ''}
                                                </span>
                                            ),
                                        )}
                                    </p>
                                </div>

                                <FontAwesomeIcon
                                    className={cx('icon-remove-music')}
                                    icon={faXmark}
                                    onClick={() => handleRemoveMusic(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {errors.listMusic && (
                <p className={cx('error')}>{errors.listMusic}</p>
            )}
        </div>
    );
}

export default AlbumAdminCreate;
