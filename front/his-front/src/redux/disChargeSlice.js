import { createSlice } from "@reduxjs/toolkit";
import { getTest } from "./WardManagementApi";



const disChargeSlice = 
    createSlice({
                    name: 'disChargeSlice',
                    initialState: {value:[]},
                    reducers:{},
                    extraReducers: (builder) => {
                        builder.addCase(getTest.fulfilled, (state, action)=>{
                            state.value[0] = action.payload 
                        })
                    }
            });

export default disChargeSlice;