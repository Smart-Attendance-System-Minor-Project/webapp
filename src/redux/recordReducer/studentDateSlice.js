import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


//get user from localStorage




const initialState = {
    
    traverse_data:{},
    isError:false,
    isSuccess: false,
    isLoading: false,
 
    
}



//Register user
export const setTraversal = createAsyncThunk('record/traversalRecord',async (recordData,thunkAPI)=>{
    try {
        return recordData;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
      
        return thunkAPI.rejectWithValue(message)
    }
})




export const authSlice = createSlice({
    name:'traversal',
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
        .addCase(setTraversal.pending,(state) => {
            state.isLoading = true
        })
        .addCase(setTraversal.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.traverse_data = action.payload
            
           
        })
        .addCase(setTraversal.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
       
           
        })
        
     
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer