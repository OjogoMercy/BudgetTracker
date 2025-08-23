import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import budgetReducer from "./BudgetSlice";

export const store = configureStore({
    reducer: {
        // auth: authReducer,
        budget: budgetReducer
    }
})