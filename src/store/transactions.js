import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: 'transaction-store',
    initialState: {
        /**
         * A list of all the accounts the user has
         * @type {App.Transaction[]}
         */
        transactions: []
    }, 
    reducers: {
        add(state, action){
            state.transactions = [
                ...state.transactions,
                action.payload
            ]
        }
    }
})

export const { add } = transactionSlice.actions;
export default transactionSlice.reducer;