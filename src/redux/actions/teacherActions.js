import { setTeacherData, setLoading, setError } from '../slices/teacherSlice';

export const fetchTeacherData = (response) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setTeacherData(response));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data || error.message));
        dispatch(setLoading(false));
    }
};

export const logoutTeacher = () => (dispatch) => {
    dispatch(setTeacherData(null));
}

