
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  return await todoService.getTodos();
});

export const addTodo = createAsyncThunk("todos/add", async (text) => {
  return await todoService.addTodo(text);
});

export const updateTodo = createAsyncThunk("todos/update", async ({ id, data }) => {
  return await todoService.updateTodo(id, data);
});

export const deleteTodo = createAsyncThunk("todos/delete", async (id) => {
  await todoService.deleteTodo(id);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => { state.loading = true; })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t._id === action.payload._id);
        state.items[idx] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;