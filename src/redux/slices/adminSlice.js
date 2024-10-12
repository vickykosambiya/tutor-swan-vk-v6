import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adminData: null,
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminData: (state, action) => {
            state.adminData = action.payload;
            console.log("State:", state.adminData);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearAdminData: (state) => {
            state.adminData = null;
        },
    },
});

export const { setAdminData, setLoading, setError, clearAdminData } = adminSlice.actions;

export default adminSlice.reducer;
