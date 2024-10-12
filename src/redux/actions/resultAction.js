import { setResults, setLoading, setError } from '../slices/resultSlice';


export const getResults = (response) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        dispatch(setLoading(true));
        dispatch(setResults(response));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data || error.message));
        dispatch(setLoading(false));
    }
};

export const logoutResults = () => (dispatch) => {
    dispatch(setResults(null));
};
