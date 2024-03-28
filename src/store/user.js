import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
    name: 'user-auth',
    initialState: {
        user: null
    },
    reducers: {
        update(state, action){
            state.user = action.payload
        }
    }
})

export const { update } = userStore.actions;

export default userStore.reducer;