import { setAdminData, setLoading, setError } from '../slices/adminSlice';

export const fetchAdminData = (response) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        dispatch(setAdminData(response));
        console.log("State:", response);
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data || error.message));
        dispatch(setLoading(false));
    }
};

export const logoutAdmin = () => (dispatch) => {
    dispatch(setAdminData(null));
};