import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {entry} from './../Interfaces/entry.interface';

const entryslice = createSlice({
    name : 'Entry Slice',
    initialState : [] as entry[],
    reducers : {
        setentries (state , {payload} : PayloadAction <entry[] | null>) {
            return state = payload != null ?  payload : []
            
        } ,
        updateentry (state, {payload} : PayloadAction <entry>) {
            const index = state.findIndex((diary) => diary.id === payload.id )
            if (index !== -1) {
                state.splice(index, 1, payload)
            }
        }
    }
})

export const {setentries, updateentry} = entryslice.actions;
export default entryslice.reducer;