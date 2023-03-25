import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


//get user from localStorage




const initialState = {
    
    records:[],
    isError:false,
    isSuccess: false,
    isLoading: false,
 
    
}



//Register user
export const setRecords = createAsyncThunk('record/settingRecord',async (recordData,thunkAPI)=>{
    try {
        return recordData;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
      
        return thunkAPI.rejectWithValue(message)
    }
})




export const authSlice = createSlice({
    name:'records',
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            
          
           
           
        }
    },
    extraReducers:(builder)=>{

        builder
        .addCase(setRecords.pending,(state) => {
            state.isLoading = true
        })
        .addCase(setRecords.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.records = action.payload
            
           
        })
        .addCase(setRecords.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
       
           
        })
        
     
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer