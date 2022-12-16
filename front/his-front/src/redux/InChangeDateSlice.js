import { createSlice } from "@reduxjs/toolkit";



const InChangeDateSlice = createSlice({
    name: 'inChangeDateSlice',
    initialState: {value: [new Date()]},
    reducers:{
        setStartDate: (state, action) => {
            state.value[0] = action.payload;     
        }
    }
});




export default InChangeDateSlice;
export const {setStartDate} = InChangeDateSlice.actions;

