import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        fetchUserFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearUserData(state) {
            state.user = null;
            state.error = null;
        },
    },
});

export const {
    fetchUserStart,
    fetchUserSuccess,
    fetchUserFailure,
    clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
