import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Authstate is an authentication state in which we control
// auth domain when token will be recieved and user could be allowed
// to be verified. it will have two parameters token and authstate in boolean

interface authenticationstate {
    token : string | null,
    isuserauthenticated : boolean
}
const initstate : authenticationstate = {
    token : null,
    isuserauthenticated : false
}
 const authslice  = createSlice({
    name : 'AuthDomain',
    initialState : initstate,
    reducers : {
        tosavetoken (state , {payload} : PayloadAction<string>) {
            if (payload) {
                state.token = payload;
            }
        },
        tocleartoken (state) {
            state.token = null;
        },
        toallowauthentication (state, {payload} : PayloadAction <boolean>) {
            state.isuserauthenticated = payload;
        }
    } 
})
// exporting action individually to be used for the specific requiremant
export const {tosavetoken, toallowauthentication, tocleartoken} = authslice.actions;
// exporting reducer to make a single store which will combile all the reducers
export default authslice.reducer