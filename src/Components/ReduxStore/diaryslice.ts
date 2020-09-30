import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {diary} from './../Interfaces/diary.interface';


const diariesslice = createSlice({
    name : 'Diaryslice',
    initialState : [] as diary[],
    reducers : {
        creatediary (state, {payload} : PayloadAction<diary[]>) {
            const diariestobesaved = payload.filter((item) => {
                // negative 1 is used to add the created value to the end of the list
                // of diaries.
                return state.findIndex((item1) => item1.id === item.id) === -1
            })
            state.push(...diariestobesaved);
        },
        updatediary (state, {payload} : PayloadAction <diary>) {
            const diaryindex = state.findIndex((diary) => diary.id === payload.id)

            if (diaryindex !== -1) {
                // What the splice method doing here is basically it is taking 3 parameters
                // 1st parameter to place item to be added on the index and 2nd to decalre 
                // the amount of item to be added and 3rd one is the item to be added 
                state.splice(diaryindex, 1, payload)
            }

        }
    }


})
export const {creatediary, updatediary} = diariesslice.actions;
export default diariesslice.reducer;