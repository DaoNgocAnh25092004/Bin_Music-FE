import { createSlice } from '@reduxjs/toolkit';

const playlistSlice = createSlice({
    name: 'playlist',
    // playlistSlice.js
    initialState: {
        isOpen: false,
        isHiding: false,
    },
    reducers: {
        showPlayList: (state) => {
            state.isHiding = false;
            state.isOpen = true;
        },
        hidePlayList: (state) => {
            state.isHiding = true;
        },
        finishHiding: (state) => {
            state.isOpen = false;
            state.isHiding = false;
        },
    },
});

export const { showPlayList, hidePlayList, finishHiding } =
    playlistSlice.actions;
export default playlistSlice.reducer;
