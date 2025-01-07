import axios from 'axios';

export const axiosJWT = axios.create();

export const loginAccount = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/login`, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signAccount = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/sign-up`, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDetailAccount = async (id, accessToken) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/account/get-details/${id}`, {
            headers: {
                authorization: accessToken,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/account/refresh-token`,
            {},
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/logout`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
