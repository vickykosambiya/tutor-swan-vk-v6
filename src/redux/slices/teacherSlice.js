import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teacherData: null,
    loading: false,
    error: null,
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        setTeacherData(state, action) {
            state.teacherData = action.payload;
            console.log("Teacher Data:", state.teacherData);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        fetchTeacherDataStart(state) {
            state.loading = true;
            state.error = null;
        },
        clearTeacherData(state) {
            state.teacherData = null;
            state.error = null;
        },
    },
});

export const {
    setTeacherData,
    setLoading,
    setError,
    clearTeacherData,
} = teacherSlice.actions;

export default teacherSlice.reducer;
