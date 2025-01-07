import axios from 'axios';

export const axiosJWT = axios.create();

export const getAllGames = async () => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/game/get-all`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createGame = async (data, accessToken) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/game/create`, data, {
            headers: {
                authorization: accessToken,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
