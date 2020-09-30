import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import {user} from './../Interfaces/user.interface';

export const userslice = createSlice({
    name : 'userslice',
    initialState : null as user | null,
    reducers : {
        // This set user is basically doing that setting user to the default
        // setting or null
        setuser(state, {payload} : PayloadAction <user | null> ) {
            return state = (payload != null) ? payload : null
        }
    }
})

export const {setuser} = userslice.actions
export default userslice.reducer;