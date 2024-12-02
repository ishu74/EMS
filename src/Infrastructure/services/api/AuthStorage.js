export const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };
  
  export const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  export const updateUserPassword = (email, newPassword) => {
    const users = getUsers();
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, password: newPassword } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };    