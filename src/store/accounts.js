import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: 'account-store',
    initialState: {
        /**
         * @type {App.Account[]}
         */
        accounts: [],
        /**
         * Determines whether data should be synced to database
         * @type {boolean}
         */
        db: false
    },
    reducers: {
        add(state, action) {
            state.accounts = [...state.accounts, action.payload]
            // const accounts = await get('accounts');
        }
    }
})

export const { add } = accountSlice.actions;

export default accountSlice.reducer;