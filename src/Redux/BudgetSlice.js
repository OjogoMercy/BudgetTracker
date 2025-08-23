const redux = require('redux');
const { createSlice } = redux;

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
        addExpenses: (state, action) => {
            state.expenses.push(action.payload)
        }
}
})
export const { setBudgetAmount, addExpense } = budgetSlice.actions;
export default budgetSlice.reducer;