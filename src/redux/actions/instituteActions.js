import { setInstituteData, setLoading, setError } from '../slices/instituteSlice';

export const fetchInstituteData = (response) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setInstituteData(response));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data || error.message));
        dispatch(setLoading(false));
    }
};

export const logoutInstitute = () => (dispatch) => {
    dispatch(setInstituteData(null));
}

