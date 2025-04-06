import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    name: '',
    email: '',
    avatar: '',
    role: '',
    isLogin: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { userId, name, email, avatar, role, isLogin } =
                action.payload;

            state.id = userId;
            state.name = name;
            state.email = email;
            state.avatar = avatar;
            state.role = role;
            state.isLogin = isLogin;
        },

        logout: (state) => {
            Object.assign(state, initialState);
            localStorage.removeItem('user');
            localStorage.removeItem('persist:root');
        },
    },
});

// Export the actions
export const { updateUser, logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
