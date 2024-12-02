// import { SET_LOADING } from "../actions/uiAction";

// const initialState = {
//   isLoading: false,
// };

// const reducers = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_LOADING:
//       return { ...state, isLoading: action.payload };
//     default:
//       return state;
//   }
// };

// export default reducers;


import * as uiActions from '../actions/uiAction'
 
const initialState = {
    loading: true
}
 
const uiReducer =  (state = initialState, action) => {
    switch (action.type){
        case (uiActions.SET_LOADING_ON):
        case(uiActions.SET_LOADING_OFF):
            return { ...state, loading: action.payload};
        default:
            return state;
    }
}
 
export default uiReducer;