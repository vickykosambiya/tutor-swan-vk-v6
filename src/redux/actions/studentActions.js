import { setStudentData, setLoading, setError } from '../slices/studentSlice';

export const fetchStudentData = (response) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setStudentData(response));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data || error.message));
        dispatch(setLoading(false));
    }
};

export const logoutStudent = () => (dispatch) => {
    dispatch(setStudentData(null));
}