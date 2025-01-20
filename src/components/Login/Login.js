import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';

import { updateUser } from '~/redux/slides/userSlide';
import Modal from '~/components/Modal';
import Image from '~/components/Image';
import images from '~/assets/images';
import * as GoogleService from '~/Services/GoogleService';
import styles from './Login.module.scss';
const className = classNames.bind(styles);

const cx = className.bind(styles);

function Login({ isOpen, setIsOpen, onLoginSuccess }) {
    const dispatch = useDispatch();

    const handleLoginSuccess = useCallback(
        async (response) => {
            try {
                console.log('🚀 ~ response:', response);
                // Call login google service
                const result = await GoogleService.LoginGoogle(response);
                // Save user info in redux
                result.user.isLogin = true;
                dispatch(updateUser(result.user));

                // Save user info in local storage
                localStorage.setItem('user', JSON.stringify(result.user));

                // // Save token in local storage
                // localStorage.setItem('accessToken', result.accessToken);
                // localStorage.setItem('refreshToken', result.refreshToken);

                // Close modal
                setIsOpen(false);

                if (onLoginSuccess) {
                    onLoginSuccess(result.user);
                }
            } catch (error) {
                toast.error('Đăng nhập thất bại');
            }
        },
        [dispatch, setIsOpen, onLoginSuccess],
    );

    const handleLoginFailure = useCallback(() => {
        toast.error('Đăng nhập thất bại');
    }, []);

    return (
        <Modal className={cx('box-login')} isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className={cx('background-login')}>
                <Image src={images.backGroundLogin} alt="Background login" />
            </div>

            <h3>Đăng nhập Bin Music</h3>

            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                shape="circle"
                width={360}
                theme="outline"
                size="large"
                buttonText="Đăng nhập bằng Google"
                scope="profile email openid https://www.googleapis.com/auth/userinfo.profile"
                access_type="offline"
            />

            <p>Bằng cách đăng nhập tài khoản, bạn đã đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của Bin Music</p>
        </Modal>
    );
}

export default Login;
