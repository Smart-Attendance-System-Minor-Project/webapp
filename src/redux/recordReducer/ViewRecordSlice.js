import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


//get user from localStorage




const initialState = {
    
    students:[],
    dateList:[],
    columnData:[],
    presentData:{},
    lastRow:[],
    csvData:[],
    presentNumbers:[],
    absentNumbers:[],
    isLoading:false,
    isError:false,
    isSuccess:false
 
    
}



//Register user
export const setForViewRecords = createAsyncThunk('record/setForViewRecords',async (recordData,thunkAPI)=>{
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
        .addCase(setForViewRecords.pending,(state) => {
            state.isLoading = true
        })
        .addCase(setForViewRecords.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.students = action.payload[0]
            state.columnData = action.payload[1]
            state.presentData = action.payload[2]
            state.csvData = action.payload[3]
            state.dateList = action.payload[4]
            state.presentNumbers = action.payload[5]
            state.absentNumbers = action.payload[6]
         
           
            
           
        })
        .addCase(setForViewRecords.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
       
           
        })
        
     
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer