import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    results: [],
    loading: false,
    error: null,
};

const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        setResults(state, action) {
            state.results = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setResults, setLoading, setError } = resultSlice.actions;
export default resultSlice.reducer;