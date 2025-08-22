import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: null,
    firstname: null,
    lastname: null,
    email: null,
  },
  accessToken: null,
  isAuthenticated: false,
  error: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const {user,accessToken} = action.payload
            state.user = {
                userId: user.userId,
                email: user.email,
                firstname: user.firstname,
                lastname:user.lastname
            }
            state.accessToken = accessToken;
            state.isAuthenticated = true;
            state.error = null
        },
        logout: (state) => {
            state.user = null,
                state.accessToken = null,
                state.isAuthenticated = false
        },
        loginError: (state, action) =>{
            state.error = action.payload
        },
        clearError: (state) =>{
            state.error = null
        }
    }
})
export default authSlice.reducer;
export const { loginSuccess, logout ,loginError,clearError} = authSlice.actions;