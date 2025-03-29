import axios from 'axios';

export const GetAlbumById = async ({ albumId }) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/album/${albumId}`,
    );

    return response.data;
};
