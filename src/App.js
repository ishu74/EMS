import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './application/actions/todoAction';
import AddTodo from './views/todo';
import TodoList from './views/todoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './views/Navbar';
import DataTableTodo from './views/DataTableTodo';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from './views/Auth/Signup';
import ResetPassword from './views/Auth/UpdatePassword';
import Login from './views/Auth/Login';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Home from './views/DynamicHome/Home';
import UILoading from './views/Loader/Spinner';
import { getLoadingState } from './application/selector/ui';
import { setLoading } from './application/actions/uiAction';
const App = () => {
  const dispatch = useDispatch();
  // const isLoading = useSelector(getLoadingState);
  
  const loading = useSelector(getLoadingState)

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  
  console.log(loading)
  // const memoizedDispatch = useCallback(() => {
  //   dispatch(fetchTodos());
  // }, [dispatch]);
  // useEffect(() => {
  //   memoizedDispatch();
  // }, [memoizedDispatch]);

  return (
    <>
      
      <Router>
        <Navbar />

        <Routes>
          
          <Route path="/add" element={<ProtectedRoute><AddTodo /></ProtectedRoute>}></Route>
          <Route path="/card" element={<ProtectedRoute><TodoList /></ProtectedRoute>}></Route>
          <Route path="/table" element={<ProtectedRoute> <DataTableTodo /> </ProtectedRoute>}></Route>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
