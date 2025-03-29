import authorizedAxiosInstance from '~/utils/authorizedAxios';

export const LoginGoogle = async (token) => {
    const response = await authorizedAxiosInstance.post(`${process.env.REACT_APP_API_URL}/user/login-google`, token);

    return response.data;
};

export const LogoutGoogle = async () => {
    const response = await authorizedAxiosInstance.delete(`${process.env.REACT_APP_API_URL}/user/logout`);

    return response.data;
};

export const RefreshToken = async () => {
    const response = await authorizedAxiosInstance.put(`${process.env.REACT_APP_API_URL}/user/refresh-token`);

    return response.data;
};

export const GetUserInfo = async () => {
    return await authorizedAxiosInstance.get(`${process.env.REACT_APP_API_URL}/user/info-user`);
};
