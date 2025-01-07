import axios from 'axios';
export const axiosJWT = axios.create();

export const updateDetailPlayer = async (id, data) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/player/update/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDetailPlayer = async (id, accessToken) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/player/get-details/${id}`, {
            headers: {
                authorization: accessToken,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
