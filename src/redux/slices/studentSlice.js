import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    studentData: null,
    loading: false,
    error: null,
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setStudentData(state, action) {
            state.studentData = action.payload;
            console.log("Student Data:", state.studentData);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearStudentData(state) {
            state.studentData = null;
            state.error = null;
        },
    },
});

export const {
    setStudentData,
    setLoading,
    setError,
    clearStudentData,
} = studentSlice.actions;

export default studentSlice.reducer;
