import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as Home from '~/Services/HomeService';

const initialState = {
    banners: [],
    status: 'idle',
    error: null,
};

export const fetchBanner = createAsyncThunk('banner/fetchBanner', async () => {
    return await Home.GetBanner();
});

export const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanner.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBanner.fulfilled, (state, action) => {
                state.status = 'succeeded';

                const items = action.payload.data.items || [];
                const bannerSection = items.find(
                    (item) => item.sectionType === 'banner',
                );

                if (bannerSection && bannerSection.items) {
                    state.banners = bannerSection.items.map(
                        (item) => item.banner,
                    );
                } else {
                    state.banners = [];
                }
            })
            .addCase(fetchBanner.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export reducer
export default bannerSlice.reducer;
