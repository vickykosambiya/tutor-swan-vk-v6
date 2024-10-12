import { setPaperPattern, setLoading, setError } from '../slices/paperPatternSlice';

export const fetchPaperPattern = (response) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setPaperPattern(response));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data || error.message));
        dispatch(setLoading(false));
    }
};


export const logoutPaperPattern = () => (dispatch) => {
    dispatch(setPaperPattern(null));
}