const redux = require("redux");
const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
    todoText:"",
    Todo : []
}

const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todoText = action.payload;
      },
      addTodo: (state, action) => {
          state.Todo.push(action.payload)
      },
      removeTodo: (state, action) => {
             state.Todo = state.Todo.filter((_, index) => index !== action.payload);
      },
      editTodo: (state, action) => {
          const { index, updatedTodo } = action.payload;
          state.todoText[index]= updatedTodo
      }
      },
  });

export const { setTodo, addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;