import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import budgetReducer from "./BudgetSlice";
import TodoSlice from "./TodoSlice";

export const store = configureStore({
    reducer: {
        // auth: authReducer,
        budget: budgetReducer,
        todo: TodoSlice
    }
})