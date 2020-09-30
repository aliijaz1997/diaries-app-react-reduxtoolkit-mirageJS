import { configureStore } from "@reduxjs/toolkit";
import combinereducers from './combinereducers';


const store = configureStore({
    reducer : combinereducers
})

export default store;