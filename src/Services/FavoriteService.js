import axios from 'axios';

export const AddFavorite = async (formData) => {
    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/favorite/add`,
        formData,
    );

    return response.data;
};

export const RemoveFavorite = async (formData) => {
    console.log('🚀 ~ RemoveFavorite ~ formData:', formData);
    const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/favorite/remove`,
        {
            data: formData,
        },
    );

    return response.data;
};

export const GetFavoriteSongsByUser = async (userId) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/favorite/${userId}`,
    );
    return response.data;
};

export const GetFavoriteFullSong = async (userId) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/favorite/full-song/${userId}`,
    );
    return response.data;
};
