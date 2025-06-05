import classNames from 'classnames/bind';
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import styles from './MusicAdminCreate.module.scss';
import BoxInput from '~/components/BoxInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBriefcase,
    faFileAudio,
    faMusic,
    faPerson,
    faPlus,
    faSignature,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { useGenericMutation } from '~/hooks/useMutationHook';
import * as MusicAdminService from '~/Services/MusicAdminService';

const cx = classNames.bind(styles);

function MusicAdminCreate() {
    const [nameArtist, setNameArtist] = useState('');
    const [roleArtist, setRoleArtist] = useState('');
    const [artists, setArtists] = useState([]);
    const nameRef = useRef();
    const [errors, setErrors] = useState({});
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [lyric, setLyric] = useState('');
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        audio: null,
        thumbnail: null,
    });

    // Mutation create music
    const mutationCreateMusic = useGenericMutation((data) =>
        MusicAdminService.CreateMusic(data),
    );

    const audioRef = useRef();
    const thumbnailRef = useRef();

    // Remove value file audio and thumbnail
    useEffect(() => {
        return () => {
            if (formValues.audio) {
                URL.revokeObjectURL(formValues.audio);
            }
            if (formValues.thumbnail) {
                URL.revokeObjectURL(formValues.thumbnail);
            }
        };
    }, [formValues.audio, formValues.thumbnail]);

    // Add todo list artist
    const handleAddArtist = () => {
        if (nameArtist && roleArtist) {
            setArtists((prevArtists) => [
                ...prevArtists,
                { name: nameArtist, role: roleArtist },
            ]);
            setNameArtist('');
            setRoleArtist('');

            setErrors((prevErrors) => ({
                ...prevErrors,
                artist: '',
            }));

            nameRef.current.focus();
        }
    };

    // Remove todo list artist
    const handleRemoveArtist = (index) => {
        setArtists((prevArtists) => prevArtists.filter((_, i) => i !== index));
    };

    // Handle change selected genres
    const genres = ['Pop', 'Rock', 'Jazz', 'Hip-Hop', 'Classical'];

    // Handle checkbox change
    const handleCheckboxChange = (genre) => {
        setSelectedGenres((prevGenres) =>
            prevGenres.includes(genre)
                ? prevGenres.filter((item) => item !== genre)
                : [...prevGenres, genre],
        );
    };

    // Check error when checkbox change
    useEffect(() => {
        if (selectedGenres.length > 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                genres: '',
            }));
        }
    }, [selectedGenres]);

    // Handle validate input change
    const handleChangeInput = useCallback(
        (e) => {
            const { name, value, type, files } = e.target;

            if (type === 'file' && files.length > 0) {
                const inputFile = files[0];

                inputFile.preview = URL.createObjectURL(inputFile);

                setFormValues((prevValues) => ({
                    ...prevValues,
                    [name]: inputFile,
                }));

                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: validateInput(name, inputFile),
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: validateInput(name, value),
                }));

                setFormValues((prevValues) => ({
                    ...prevValues,
                    [name]: value.trimStart(),
                }));
            }
        },
        // eslint-disable-next-line
        [],
    );

    // Validation value
    const validationValues = {
        name: {
            required: true,
            emptyMessage: 'Tên bài hát không được để trống.',

            regex: /^[a-zA-ZÀ-Ỹà-ỹ0-9\s]+$/,
            errorMessage: 'Tên bài hát không được chứa ký tự đặc biệt.',
        },
        audio: {
            required: true,
            emptyMessage: 'Vui lòng chọn một file âm thanh.',
            fileType: ['audio/mpeg', 'audio/wav'],
            maxSize: 20 * 1024 * 1024,
            errorMessage:
                'File không hợp lệ. Chỉ chấp nhận MP3/WAV và tối đa 10MB.',
        },
        thumbnail: {
            required: true,
            emptyMessage: 'Vui lòng chọn một file hình ảnh.',
            fileType: ['image/jpeg', 'image/png', 'image/jpg'],
            maxSize: 10 * 1024 * 1024,
            errorMessage:
                'File không hợp lệ. Chỉ chấp nhận JPEG/PNG/JPG và tối đa 5MB.',
        },

        lyric: {
            required: true,
            emptyMessage: 'Vui nhập nội dung lời bài hát.',
        },
    };

    // Validate Input: return error message
    const validateInput = (name, value) => {
        const rule = validationValues[name];

        if (!rule) return '';

        // Check value is empty
        if (rule.required && !value) {
            return rule.emptyMessage;
        }

        // Check regex (Only input type is string)
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

    // Validate Form return errors object with key is field name and value is error message
    const validateForm = () => {
        const errors = {};

        Object.keys(formValues).forEach((field) => {
            const errorMessage = validateInput(field, formValues[field]);
            if (errorMessage) {
                errors[field] = errorMessage;
            }
        });

        // Handle when list artist is empty
        if (artists.length === 0) {
            errors.artist = 'Danh sách nghệ sĩ không được để trống.';
        }

        // Handle when genres is empty
        if (selectedGenres.length === 0) {
            errors.genres = 'Vui lòng chọn ít nhất một thể loại.';
        }

        // Handle when lyric is empty
        if (!lyric) {
            errors.lyric = 'Lời bài hát không được để trống.';
        }

        return errors;
    };

    // Handle change lyric
    const handleChangeLyric = (e) => {
        setLyric(e.target.value);

        setErrors((prevErrors) => ({
            ...prevErrors,
            lyric: validateInput('lyric', e.target.value),
        }));
    };

    // Add music
    const handleAddMusic = async () => {
        const errors = validateForm();

        // Handle when form has error
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const formData = new FormData();

        formData.append('name', formValues.name);
        formData.append('audio', formValues.audio);
        formData.append('thumbnail', formValues.thumbnail);
        formData.append('listArtist', JSON.stringify(artists));
        formData.append('genres', JSON.stringify(selectedGenres));
        formData.append('lyric', lyric);
        console.log(
            '🚀 ~ handleAddMusic ~ formValues.thumbnail:',
            formValues.thumbnail,
        );

        setLoading(true);
        mutationCreateMusic.mutate(formData, {
            onSuccess: () => {
                toast.success('Thêm bài hát thành công');

                // Remove value after add music success
                setFormValues({
                    name: '',
                    audio: null,
                    thumbnail: null,
                });

                setArtists([]);

                setSelectedGenres([]);

                setLyric('');

                // Reset input file
                audioRef.current.value = '';
                thumbnailRef.current.value = '';
                setLoading(false);
            },
            onError: (error) => {
                toast.error(error.response?.data.message || error.message);
                setLoading(false);
            },
        });
    };

    return (
        <div className={cx('container')}>
            <div className={cx('box-left')}>
                <BoxInput
                    label="Tên bài hát"
                    name="name"
                    placeholder="Nhập tên bài hát..."
                    icon={<FontAwesomeIcon icon={faSignature} />}
                    error={errors.name}
                    value={formValues.name}
                    onChange={handleChangeInput}
                />
                <BoxInput
                    ref={nameRef}
                    label="Tên nghệ sĩ"
                    name="nameArtist"
                    placeholder="Nhập tên nghệ sĩ..."
                    icon={<FontAwesomeIcon icon={faPerson} />}
                    error={errors.nameArtist}
                    value={nameArtist}
                    cxc
                    onChange={(e) => setNameArtist(e.target.value.trimStart())}
                />
                <div className={cx('box-input-role')}>
                    <BoxInput
                        label="Vai trò của nghệ sĩ"
                        name="roleArtist"
                        placeholder="Nhập vai trò của nghệ sĩ..."
                        icon={<FontAwesomeIcon icon={faBriefcase} />}
                        error={errors.role}
                        value={roleArtist}
                        onChange={(e) =>
                            setRoleArtist(e.target.value.trimStart())
                        }
                    />
                    <Button
                        primary
                        borderRadius4
                        animation
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        className={cx('btn-add-artist')}
                        onClick={handleAddArtist}
                    >
                        Thêm
                    </Button>
                </div>

                <div className={cx('list-artist')}>
                    {artists.length > 0 &&
                        artists.map((artist, index) => (
                            <div key={index} className={cx('artist-item')}>
                                <span>{artist.name}</span> :{' '}
                                <span>{artist.role}</span>
                                <FontAwesomeIcon
                                    className={cx('icon-remove-artist')}
                                    icon={faXmark}
                                    onClick={() => handleRemoveArtist(index)}
                                />
                            </div>
                        ))}
                    {errors.artist && (
                        <p className={cx('error')}>{errors.artist}</p>
                    )}
                </div>

                <BoxInput
                    label="Hình bìa bài hát"
                    name="thumbnail"
                    ref={thumbnailRef}
                    type="file"
                    placeholder="Chọn file ảnh bìa của bạn"
                    icon={<FontAwesomeIcon icon={faImage} />}
                    error={errors.thumbnail}
                    onChange={handleChangeInput}
                />

                {
                    // Show thumbnail preview
                    !errors.thumbnail && formValues.thumbnail && (
                        <div className={cx('thumbnail-wrapper')}>
                            <Image
                                src={formValues.thumbnail?.preview}
                                alt="Thumbnail preview"
                                className={cx('thumbnail-preview')}
                            />
                        </div>
                    )
                }
            </div>
            <div className={cx('box-right')}>
                <BoxInput
                    label="File âm thanh bài hát"
                    name="audio"
                    type="file"
                    ref={audioRef}
                    placeholder="Chọn file âm thanh của bạn..."
                    icon={<FontAwesomeIcon icon={faFileAudio} />}
                    error={errors.audio}
                    className={cx('box-input-audio')}
                    onChange={handleChangeInput}
                />

                {
                    // Show audio preview
                    !errors.audio && formValues.audio && (
                        <audio
                            controls
                            className={cx('audio-preview')}
                            src={formValues.audio?.preview}
                        >
                            Your browser does not support the
                            <code>audio</code> element.
                        </audio>
                    )
                }

                <div className={cx('box-genres')}>
                    <label>Thể loại</label>
                    <div className={cx('genres')}>
                        {genres.map((genre, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={`genre-${index}`}
                                    checked={selectedGenres.includes(genre)}
                                    onChange={() => handleCheckboxChange(genre)}
                                />
                                <label htmlFor={`genre-${index}`}>
                                    {genre}
                                </label>
                            </div>
                        ))}

                        {errors.genres && (
                            <p className={cx('error')}>{errors.genres}</p>
                        )}
                    </div>
                </div>

                <div className={cx('box-lyric')}>
                    <label>Lời bài hát</label>
                    <textarea
                        placeholder="Nhập lời bài hát..."
                        className={cx('lyric', { 'error-area': errors.lyric })}
                        rows="15"
                        value={lyric}
                        onChange={handleChangeLyric}
                    ></textarea>
                </div>

                {errors.lyric && <p className={cx('error')}>{errors.lyric}</p>}

                <Button
                    primary
                    animation
                    leftIcon={<FontAwesomeIcon icon={faMusic} />}
                    onClick={handleAddMusic}
                    disabled={loading}
                    className={cx('btn-add-music')}
                >
                    Thêm mới 1 bài hát
                </Button>
            </div>
        </div>
    );
}

export default MusicAdminCreate;
