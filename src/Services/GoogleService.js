import axios from 'axios';

export const LoginGoogle = async (token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login-google`, token);

        return response.data;
    } catch (error) {
        throw error;
    }
};
