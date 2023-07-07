import { configureStore } from "@reduxjs/toolkit";
import  gitRepos  from "./features/gitUserSlice";


export const store = configureStore({
    reducer : {
        app: gitRepos,
    },
});