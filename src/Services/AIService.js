import authorizedAxiosInstance from '~/utils/authorizedAxios';

export const createPlaylist = async (formData) => {
    const response = await authorizedAxiosInstance.post(
        `${process.env.REACT_APP_API_URL}/ai/create`,
        formData,
    );

    return response.data;
};
