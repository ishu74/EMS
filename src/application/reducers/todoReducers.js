const initialState = {
  todos: [],
  loading: true,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true };
   
    case 'FETCH_TODOS_SUCCESS':
      return { ...state, todos: action.payload , loading: false };
    case 'ADD_TODO_SUCCESS':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO_SUCCESS':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'UPDATE_TODO_SUCCESS':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload }
            : todo
        ),
      };

    default:
      return state;
  }
};

export default reducers;
