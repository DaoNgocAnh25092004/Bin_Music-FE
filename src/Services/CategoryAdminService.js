import authorizedAxiosInstance from '~/utils/authorizedAxios';

export const CreateCategoryAlbum = async (data) => {
    const response = await authorizedAxiosInstance.post(
        `${process.env.REACT_APP_API_URL}/admin/category-album/create`,
        data,
    );

    return response.data;
};

export const GetListCategoryAlbum = async () => {
    const response = await authorizedAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}/admin/category-album/get-all`,
    );

    return response.data;
};
