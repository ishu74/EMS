import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../application/selector/todoSelector';
import { removeTodo, updateTodo } from '../application/actions/todoAction';
import TodoItem from './todoItem';
import { Container } from 'react-bootstrap'
import { getLoading, getLoadingState } from '../application/selector/ui';
import { pageLoaded } from '../application/actions/uiAction';


const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const loading = useSelector(getLoadingState);

  const handleUpdate = (updatedTodo) => {
    dispatch(updateTodo(updatedTodo));
  };

//   useEffect(() => {
//     dispatch(loading);
// }, [dispatch]);

  return (
    <Container className="my-4">
      {loading ? "Loading todos ....":(<><h2>All Cards</h2>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={() => dispatch(removeTodo(todo.id))}
            onUpdate={handleUpdate}
          />
        ))
      ) : (
        <p>No Data yet. Add one!</p>
      )}
      </>)}
    </Container>
  );
};

export default TodoList;
