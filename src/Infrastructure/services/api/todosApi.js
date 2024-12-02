
const fetchTodos = () => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  };
  
  const addTodo = (todo) => {
    const todos = fetchTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    return todo;
  };
  
  const removeTodo = (id) => {
    let todos = fetchTodos();
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
  };
 
  const updateTodo = (updatedTodo) => {
    const todos = fetchTodos()
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    return updatedTodo;
  };
  export default {fetchTodos,updateTodo, addTodo, removeTodo }