import authorizedAxiosInstance from '~/utils/authorizedAxios';

export const CreateMusic = async (formData) => {
    const response = await authorizedAxiosInstance.post(
        `${process.env.REACT_APP_API_URL}/admin/music/create`,
        formData,
    );

    return response.data;
};

export const getListMusic = async ({ page, limit }) => {
    const response = await authorizedAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}/admin/music/list`,
        {
            params: {
                page,
                limit,
            },
        },
    );

    return response.data;
};

export const searchMusic = async ({ page, limit, name, artist }) => {
    const response = await authorizedAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}/admin/music/search`,
        {
            params: {
                page,
                limit,
                name,
                artist,
            },
        },
    );

    return response.data;
};
