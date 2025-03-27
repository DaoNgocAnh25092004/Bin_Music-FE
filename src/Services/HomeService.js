import axios from 'axios';

export const GetBanner = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/zing/home`,
    );

    return response.data;
};

export const GetAlbumByCategory = async ({ categoryName }) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/home/album/${encodeURIComponent(
            categoryName,
        )}`,
    );

    return response.data;
};
