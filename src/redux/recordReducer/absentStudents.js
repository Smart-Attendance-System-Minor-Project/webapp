import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


//get user from localStorage




var initialState = {
    
    absentStudents:[],
    isError:false,
    isSuccess: false,
    isLoading: false,
 
    
}



//Register user
export const setAbsentStudents = createAsyncThunk('record/absentStudents',async (recordData,thunkAPI)=>{
    try {
        return recordData;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
      
        return thunkAPI.rejectWithValue(message)
    }
})




export const authSlice = createSlice({
    name:'setAbsentStudents',
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
        .addCase(setAbsentStudents.pending,(state) => {
            state.isLoading = true
        })
        .addCase(setAbsentStudents.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            action.payload.sort(function(b,a){return b["absentCount"] - a["absentCount"]})
            state.absentStudents = action.payload.reverse()
            
           
        })
        .addCase(setAbsentStudents.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
       
           
        })
        
     
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer