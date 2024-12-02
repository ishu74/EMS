// import { ADD_TODO, ADD_TODO_SUCCESS, FETCH_TODOS, FETCH_TODOS_SUCCESS, REMOVE_TODO, REMOVE_TODO_SUCCESS, UPDATE_TODO, UPDATE_TODO_SUCCESS } from '../actions/todoAction';
// import { setLoading } from '../actions/uiAction';

// const uiMiddleware =({api})=> ({ dispatch }) => (next) => (action) => {
//   if (action.type === FETCH_TODOS || ADD_TODO|| REMOVE_TODO|| UPDATE_TODO) {
//    dispatch(setLoading(true));
//   }
//   const result = next(action);

//   if (action.type === FETCH_TODOS_SUCCESS || ADD_TODO_SUCCESS|| UPDATE_TODO_SUCCESS || REMOVE_TODO_SUCCESS) {
//   dispatch(setLoading(false));
//   }
//   return result;
// };

// export default [uiMiddleware];


// import { loadEmployee } from "../actions/employeeAction";
import { PAGE_LOADED } from "../actions/uiAction";
import * as employeeActions from '../actions/todoAction'
 
const pageLoadedFlow =
  ({ api }) =>
  (store) =>
  (next) =>
  async (action) => {
    // console.log('store in middleware:', store);
 
    if (action.type === PAGE_LOADED) {
      try{
        store.dispatch(employeeActions.fetchTodos());
      }catch(err){
        console.log(err);
      }
    }
    return next(action);
  };
 
export default [pageLoadedFlow];