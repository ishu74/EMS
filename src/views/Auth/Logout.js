import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser'&& "users"); 
    navigate('/'); 
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;