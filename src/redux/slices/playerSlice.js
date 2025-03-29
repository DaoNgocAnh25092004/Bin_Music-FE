import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSong: null,
    isPlaying: false,
    playlist: [],
    currentSongIndex: 0,
    currentTimeSong: 0,
    timeSong: 0,
    isShuffle: false,
    isRepeat: false,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayList: (state, action) => {
            state.playlist = action.payload;
        },
        setCurrentSong: (state, action) => {
            state.currentTimeSong = 0;
            state.isPlaying = true;
            state.currentSong = action.payload;
            state.currentSongIndex = state.playlist.findIndex(
                (song) => song._id === action.payload._id,
            );
        },
        updateCurrentTime: (state, action) => {
            state.currentTimeSong = action.payload;
        },
        updateTimeSong: (state, action) => {
            state.timeSong = action.payload;
        },
        playPause: (state, action) => {
            state.isPlaying = action.payload.isPlaying;
            state.currentTimeSong = action.payload.currentTimeSong;
        },
        nextSong: (state) => {
            if (!state.isRepeat) {
                if (state.playlist.length === 0) return;

                if (state.isShuffle) {
                    let randomIndex;
                    do {
                        randomIndex = Math.floor(
                            Math.random() * state.playlist.length,
                        );
                    } while (randomIndex === state.currentSongIndex);
                    state.currentSongIndex = randomIndex;
                } else {
                    state.currentSongIndex =
                        (state.currentSongIndex + 1) % state.playlist.length;
                }

                state.currentSong = state.playlist[state.currentSongIndex];
                state.currentTimeSong = 0;
                state.isPlaying = true;
            }
        },
        prevSong: (state) => {
            if (!state.isRepeat) {
                if (state.playlist.length === 0) return;
                if (state.isShuffle) {
                    let randomIndex;
                    do {
                        randomIndex = Math.floor(
                            Math.random() * state.playlist.length,
                        );
                    } while (randomIndex === state.currentSongIndex);
                    state.currentSongIndex = randomIndex;
                } else {
                    state.currentSongIndex =
                        (state.currentSongIndex - 1 + state.playlist.length) %
                        state.playlist.length;
                }
                state.currentSong = state.playlist[state.currentSongIndex];
                state.currentTimeSong = 0;
                state.isPlaying = true;
            }
        },
        toggleShuffle: (state) => {
            state.isShuffle = !state.isShuffle;
        },
        toggleRepeat: (state) => {
            state.isRepeat = !state.isRepeat;
        },
    },
});

export const {
    setCurrentSong,
    playPause,
    setPlayList,
    nextSong,
    prevSong,
    updateCurrentTime,
    updateTimeSong,
    toggleShuffle,
    toggleRepeat,
} = playerSlice.actions;
export default playerSlice.reducer;
