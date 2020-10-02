import { combineReducers } from "@reduxjs/toolkit";
import authslice from "./authslice";
import userslice from './userslice';
import diaryslice from './diaryslice';
import entryslice from './entryslice';
import editorslice from './editorslice'
// import { Type } from "typescript";


const combinereducers = combineReducers({
    auth : authslice,
    diaries : diaryslice,
    enteries : entryslice,
    user : userslice,
    editor: editorslice
})
export type combinereducertype = ReturnType < typeof combinereducers >
export default combinereducers;