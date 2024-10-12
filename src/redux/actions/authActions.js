export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (response.ok) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        } else {
            dispatch({ type: 'LOGIN_FAILURE', payload: data.message });
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
};

export const logoutUser = () => async (dispatch) => {
    dispatch({ type: 'LOGOUT_REQUEST' });
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        dispatch({ type: 'LOGOUT_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'LOGOUT_FAILURE', payload: error.message });
    }
};

export const selectAuthData = (state) => state.auth.authData;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
