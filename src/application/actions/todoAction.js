

export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS"
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS"
export const REMOVE_TODO_SUCCESS = "REMOVE_TODO_SUCCESS"
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS"
export const FETCH_TODOS = "FETCH_TODOS"
export const ADD_TODO = "ADD_TODO"
export const REMOVE_TODO = "REMOVE_TODO"
export const UPDATE_TODO = 'UPDATE_TODO'



export const fetchTodosSuccess = (todos) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: todos,
});

export const addTodoSuccess = (todo) => ({
  type: ADD_TODO_SUCCESS,
  payload: todo,
});

export const removeTodoSuccess = (id) => ({
  type: REMOVE_TODO_SUCCESS,
  payload: id,
});

export const fetchTodos = () => ({
  type: FETCH_TODOS,
});

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});

export const updateTodoSuccess = (todo) => ({
  type: UPDATE_TODO_SUCCESS,
  payload: todo,
});

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});


// export const fetchTodosRequest = () => ({ type: FETCH_TODOS_REQUEST });
