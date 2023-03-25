import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

//get user from localStorage
const user = localStorage.getItem('username');



const initialState = {
 
    isError:false,
    isSuccess: false,
    isLoading: false,
    message: '',
    user: user?user:null
}



//Register user
export const register = createAsyncThunk('auth/register',async (user,thunkAPI)=>{
    try {
        return await authService.register(user);
    } catch (error) {
        const message =  error.response.data.error
        console.log(error.response.data.error)
        return thunkAPI.rejectWithValue(message)
    }
})
export const login = createAsyncThunk('auth/login',async (user, thunkAPI) => {

    try {       
           
            return await authService.login(user);
           

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})




export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
          
           
           
        }
    },
    extraReducers:(builder)=>{

        builder
        .addCase(login.pending,(state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            
           
        })
        .addCase(login.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = "Invalid Credentials"
           
        })
        .addCase(register.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
           
        })
        .addCase(register.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
           
        })
       
       
     
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer