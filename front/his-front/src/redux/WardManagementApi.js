import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants/Config";

export const getTest = createAsyncThunk(
    'disChargeSlice/getTest',
    async() => {
        const resp = await axios.get(API_URL+"/AdmissionFront/test");
        return resp.data
    }
)

