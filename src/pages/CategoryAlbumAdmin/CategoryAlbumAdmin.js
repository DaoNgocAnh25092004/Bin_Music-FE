import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faListCheck,
    faPlus,
    faSignature,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import styles from './CategoryAlbumAdmin.module.scss';
import BoxInput from '~/components/BoxInput';
import Button from '~/components/Button';
import { useGenericMutation } from '~/hooks/useMutationHook';
import * as CategoryAdminService from '~/Services/CategoryAdminService';

const cx = classNames.bind(styles);

function CategoryAlbumAdmin() {
    const [forms, setForms] = useState({
        name: '',
        description: '',
    });
    const [errors, setErrors] = useState({});
    const mutationCreateCategoryAlbum = useGenericMutation((data) =>
        CategoryAdminService.CreateCategoryAlbum(data),
    );
    const [loading, setLoading] = useState(false);

    const handleChangeInput = useCallback(
        (e) => {
            const { value, name } = e.target;

            setForms((prev) => ({
                ...prev,
                [name]: value.trimStart(),
            }));

            setErrors((prev) => ({
                ...prev,
                [name]: validateInput(name, value),
            }));
        },
        // eslint-disable-next-line
        [],
    );

    const validateInput = (name, value) => {
        const rule = validationValues[name];

        if (!rule) return null;

        if (rule.required && !value) {
            return rule.emptyMessage;
        }

        if (rule.regex && !rule.regex.test(value)) {
            return rule.errorMessage;
        }

        return null;
    };

    const validationValues = {
        name: {
            required: true,
            emptyMessage: 'Tên thể loại album không được để trống.',

            regex: /^[a-zA-ZÀ-Ỹà-ỹ0-9\s]+$/,
            errorMessage: 'Tên thể loại album không được chứa ký tự đặc biệt.',
        },

        description: {
            required: true,
            emptyMessage: 'Mô tả thể loại album không được để trống.',

            regex: /^[a-zA-ZÀ-Ỹà-ỹ0-9\s]+$/,
            errorMessage:
                'Mô tả thể loại album không được chứa ký tự đặc biệt.',
        },
    };

    const validateForms = () => {
        const errors = {};

        Object.keys(forms).forEach((item) => {
            const errorMessage = validateInput(item, forms[item]);
            if (errorMessage) {
                errors[item] = errorMessage;
            }
        });

        return errors;
    };

    const handleAddCategory = () => {
        const errors = validateForms();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        const data = {
            name: forms.name,
            description: forms.description,
        };

        setLoading(true);

        mutationCreateCategoryAlbum.mutate(data, {
            onSuccess: () => {
                toast.success('Tạo thể loại album thành công!');

                setForms({
                    name: '',
                    description: '',
                });

                setErrors('');

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
            <BoxInput
                label="Tên thể loại của album"
                name="name"
                placeholder="Nhập tên thể loại của album..."
                icon={<FontAwesomeIcon icon={faSignature} />}
                error={errors.name}
                value={forms.name}
                onChange={handleChangeInput}
            />

            <BoxInput
                label="Mô tả thể loại của album"
                name="description"
                placeholder="Nhập mô tả thể loại của album..."
                icon={<FontAwesomeIcon icon={faListCheck} />}
                error={errors.description}
                value={forms.description}
                onChange={handleChangeInput}
            />

            <Button
                primary
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                onClick={handleAddCategory}
                borderRadius4
                animation
                className={cx('btn-add')}
                disabled={loading}
            >
                Thêm thể loại mới
            </Button>
        </div>
    );
}

export default CategoryAlbumAdmin;
