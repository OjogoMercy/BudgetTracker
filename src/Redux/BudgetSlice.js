const redux = require("redux");
const createSlice = require("@reduxjs/toolkit").createSlice;
const initialState = {
  budgetAmount: "",
  expense: [],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgetAmount: (state, action) => {
      state.budgetAmount = action.payload;
    },
    addExpense: (state, action) => {
      state.expense.push(action.payload);
    },
      deleteExpense: (state, action) => {
      state.expense = state.expense.filter((_, index) => index !== action.payload);
    },
    editExpense: (state, action) => {
      const { index, updatedExpense } = action.payload;
      state.expense[index] = updatedExpense;
    },
  },
});
export const { setBudgetAmount, addExpense ,deleteExpense,editExpense} = budgetSlice.actions;
export default budgetSlice.reducer;
