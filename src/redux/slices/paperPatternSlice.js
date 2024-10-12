import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paperPattern: null,
    loading: false,
    error: null,
};

const paperPatternSlice = createSlice({

    name: 'paperPattern',
    initialState,
    reducers: {
        setPaperPattern(state, action) {
            state.paperPattern = action.payload;
            console.log(state.paperPattern);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearPaperPattern(state) {
            state.paperPattern = null;
            state.error = null;
        },
    },
});

export const {
    setPaperPattern,
    setLoading,
    setError,
    clearPaperPattern,
} = paperPatternSlice.actions;

export default paperPatternSlice.reducer;