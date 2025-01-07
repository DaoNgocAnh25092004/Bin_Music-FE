import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slides/accountSlide';

export const store = configureStore({
    reducer: {
        account: accountReducer,
    },

    devTools: true,
});
