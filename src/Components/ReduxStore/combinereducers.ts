import { combineReducers } from "@reduxjs/toolkit";
import authslice from "./authslice";
import userslice from './userslice';
import diaryslice from './diaryslice';
import entryslice from './entryslice';
// import { Type } from "typescript";


const combinereducers = combineReducers({
    auth : authslice,
    diaries : diaryslice,
    enteries : entryslice,
    user : userslice
})
export type combinereducertype = ReturnType < typeof combineReducers >
export default combinereducers;