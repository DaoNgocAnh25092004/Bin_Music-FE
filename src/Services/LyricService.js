import axios from 'axios';

export const GetLyric = async ({ musicId }) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/lyric/${musicId}`,
    );

    return response.data;
};
