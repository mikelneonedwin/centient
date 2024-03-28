import { configureStore } from "@reduxjs/toolkit";
import userStore from "./user";
import accountStore from "./accounts";

const Store = configureStore({
    reducer: {
        user: userStore,
        accounts: accountStore
    }
})

export default Store;