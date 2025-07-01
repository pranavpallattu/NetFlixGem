import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        movieNames:null,
        movieResults:null
    },
    reducers:{
        toggleGPTSearch:(state,action)=>{
            state.showGptSearch=!state.showGptSearch
        },
        addGPTMovieResult:(state,action)=>{
            const{movieNames,movieResults}=action.payload
            state.movieNames=movieNames
            state.movieResults=movieResults
        },
        removeGPTMovieResult:(state,action)=>{
            state.movieNames=null
            state.movieResults=null
        }
    }
})

export const {toggleGPTSearch, addGPTMovieResult, removeGPTMovieResult} = gptSlice.actions
export default gptSlice.reducer