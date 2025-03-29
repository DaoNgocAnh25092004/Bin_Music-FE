import authorizedAxiosInstance from '~/utils/authorizedAxios';

export const CreateAlbum = async (formData) => {
    const response = await authorizedAxiosInstance.post(
        `${process.env.REACT_APP_API_URL}/admin/album/create`,
        formData,
    );

    return response.data;
};
