import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import bannerSlice from './slices/bannerSlice';
import userReducer from './slices/userSlice';
import playerReducer from './slices/playerSlice';
import volumeReducer from './slices/volumeSlice';

// Cấu hình persist riêng cho playerReducer
const playerPersistConfig = {
    key: 'player',
    storage,
    blacklist: ['isPlaying'], // Không lưu trạng thái isPlaying
};

// Cấu hình persist chung cho user và volume
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'volume'], // Chỉ lưu user và volume
};

// Kết hợp reducers
const rootReducer = combineReducers({
    user: userReducer,
    banner: bannerSlice,
    volume: volumeReducer,
    player: persistReducer(playerPersistConfig, playerReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['register'],
            },
        }),
});

// Tạo persistor để dùng trong `PersistGate`
export const persistor = persistStore(store);
