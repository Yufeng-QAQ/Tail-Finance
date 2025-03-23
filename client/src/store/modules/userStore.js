import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";
import { setToken as _setToken, getToken, removeToken } from "../../utils";

const userStore = createSlice({
    name: "user",

    initialState: {
        token: getToken() || '',
        user: ''
    },

    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            _setToken(action.payload);
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        removeUser(state) {
            state.user = '';
            state.token = '';
            removeToken();
        }
    }
});

const {setToken, setUser, removeUser} = userStore.actions;

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        try {
            const res = await request.post('/users/login', loginForm);
            dispatch(setToken(res.data.accessToken));
            dispatch(setUser(res.data.user));
            return { auth: res.data.auth };
        } catch (error) {
            return { auth: false, message: error.response?.data }
        }
    }
};




export { setToken, removeUser , fetchLogin };
const userReducer = userStore.reducer;
export default userReducer;