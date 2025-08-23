const redux = require('redux');
const createSlice = require('@reduxjs/toolkit').createSlice;
const initialState = {
    budgetAmount: '',
    expenses: []
}


const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers:{
        setBudgetAmount:(state, action) => {
    state.budgetAmount = action.payload;
        },
        addExpense: (state, action) => {
            state.expense.push(action.payload)
        }
}
})
export const { setBudgetAmount, addExpense } = budgetSlice.actions;
export default budgetSlice.reducer;