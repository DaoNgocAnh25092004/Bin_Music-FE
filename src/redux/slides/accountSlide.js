import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    phone: '',
    avatar: '',
    userId: '',
    fullName: '',
    address: '',
    dayOfBirth: '',
    gender: '',
    role: '',
    isLoggedIn: false,
};

export const accountSlice = createSlice({
    devTools: true,
    name: 'account',
    initialState,
    reducers: {
        updateAccount: (state, action) => {
            const { username, email, phone, userId, avatar, fullName, address, gender, dayOfBirth, role } = action.payload;

            state.fullName = fullName;
            state.address = address;
            state.dayOfBirth = dayOfBirth;
            state.gender = gender;
            state.username = username;
            state.email = email;
            state.phone = phone;
            state.role = role;
            state.isLoggedIn = true;
            state.userId = userId;
            state.avatar = avatar;
        },
        resetAccount: (state, action) => {
            state.username = '';
            state.email = '';
            state.phone = '';
            state.isLoggedIn = false;
            state.userId = '';
            state.avatar = '';
            state.fullName = '';
            state.address = '';
            state.role = '';
            state.dayOfBirth = '';
            state.gender = '';
        },
    },
});

// Export the actions
export const { updateAccount, resetAccount } = accountSlice.actions;

// Export the reducer
export default accountSlice.reducer;
