import authorizedAxiosInstance from '~/utils/authorizedAxios';

export const createPlaylist = async (formData) => {
    const response = await authorizedAxiosInstance.post(
        `${process.env.REACT_APP_API_URL}/playlist/create`,
        formData,
    );

    return response.data;
};

export const getAllPlaylist = async () => {
    const response = await authorizedAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}/playlist/get-all`,
    );

    return response.data;
};

export const getPlaylistById = async (playlistId) => {
    const response = await authorizedAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}/playlist/get-detail/${playlistId}`,
    );

    return response.data;
};

export const addSongToPlaylist = async (playlistId, songId) => {
    const response = await authorizedAxiosInstance.post(
        `${process.env.REACT_APP_API_URL}/playlist/add-song`,
        { playlistId, songId },
    );

    return response.data;
};
