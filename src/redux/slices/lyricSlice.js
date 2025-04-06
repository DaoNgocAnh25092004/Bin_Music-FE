import { createSlice } from '@reduxjs/toolkit';

const lyricSlice = createSlice({
    name: 'lyric',
    initialState: {
        isOpen: false,
    },
    reducers: {
        openLyric: (state) => {
            state.isOpen = true;
        },
        closeLyric: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openLyric, closeLyric } = lyricSlice.actions;
export default lyricSlice.reducer;
