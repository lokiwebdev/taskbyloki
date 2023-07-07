import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

   //---action----
export const getAllData = createAsyncThunk("gitRepos" , async (page) => {
    const url = `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc${page}`;
    const response = await axios.get(url);
    const result = response.data.items;
    return result;
})

export const gitRepos = createSlice({
    name: "gitRepos" ,
    initialState: {
        repos: [],
        loading: false,
        error: null,
    },
    extraReducers: {
        [getAllData.pending] : (state) => {
            state.loading = true;
        },
        [getAllData.fulfilled] : (state, action) => {
            state.loading = false;
            state.repos = action.payload;
        },
        [getAllData.pending] : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default gitRepos.reducer;