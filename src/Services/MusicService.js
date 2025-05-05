import axios from 'axios';

export const GetMusicById = async ({ musicId }) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/music/${musicId}`,
    );

    return response.data;
};

export const searchMusic = async ({ page, limit, name, artist }) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/music/search`,
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
