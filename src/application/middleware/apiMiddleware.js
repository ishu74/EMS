
import {  ADD_TODO, ADD_TODO_SUCCESS, addTodoSuccess, FETCH_TODOS, FETCH_TODOS_SUCCESS, fetchTodosSuccess, REMOVE_TODO, REMOVE_TODO_SUCCESS, removeTodoSuccess, UPDATE_TODO, UPDATE_TODO_SUCCESS, updateTodoSuccess } from "../actions/todoAction";
import { setLoading } from "../actions/uiAction";
import * as uiActions from '../actions/uiAction'


const fetchMiddleware = ({api}) => ({dispatch})  => (next) => (action) => {
if (action.type === FETCH_TODOS) {
  try {
    // dispatch(setLoading(true));
    // debugger
    dispatch(uiActions.setLoading(true))
    const todos = api.todosApi.fetchTodos();
    dispatch(fetchTodosSuccess(todos));
    dispatch(uiActions.setLoading(false))
  } catch (error) {
    console.log("Fetch Todos Error",error)
  }
  //  dispatch(setLoading(false));
}
next(action);
}



const addMiddleware = ({api}) => ({dispatch})  => (next) => (action) => {
if (action.type === ADD_TODO) {
  try {
    dispatch(setLoading(true));
    const addedTodo = api.todosApi.addTodo(action.payload);
    dispatch(addTodoSuccess(addedTodo));
    dispatch(setLoading(false));
  } catch (error) {
    console.log("Add Todos Error",error)
  }
  dispatch(setLoading(false))
}
next(action);
}


const removeMiddleware = ({api}) => ({dispatch})  => (next) => (action) => {
if (action.type === REMOVE_TODO) {
  try {
    api.todosApi.removeTodo(action.payload);
    dispatch(removeTodoSuccess(action.payload));
  } catch (error) {
    console.log("Remove Todos Error",error)
  }
}
next(action);

}

const updateMiddleware = ({api}) => ({dispatch})  => (next) => (action) => {
if (action.type ===UPDATE_TODO) {
  try {
    const updatedTodo = api.todosApi.updateTodo(action.payload);
    dispatch(updateTodoSuccess(updatedTodo));
  } catch (error) {
    console.log("Update Todos Error",error)
  }
}
next(action);
}
export default [fetchMiddleware, addMiddleware, removeMiddleware, updateMiddleware,];
