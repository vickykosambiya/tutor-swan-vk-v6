import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const instituteSlice = createSlice({
    name: 'institute',
    initialState,
    reducers: {
        setInstituteData(state, action) {
            state.user = action.payload;
            console.log("Institute Data:", state.user);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearInstituteData(state) {
        },
        fetchInstituteFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    setInstituteData,
    setLoading,
    setError,
    clearInstituteData,
    fetchInstituteFailure,
} = instituteSlice.actions;

export default instituteSlice.reducer;
