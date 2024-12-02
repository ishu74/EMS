import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { getUsers, saveUser } from '../../Infrastructure/services/api/AuthStorage';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
   
  const isWorkEmail = (email) => {
    const allowedDomains = ['example.com', 'company.org', 'workplace.net' ,"test.com"]; 
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  }

  const handleRegister = (e) => {
    e.preventDefault();


    if (!isWorkEmail(email)) {
      setError('Please enter a valid work email address.');
      return;
    }
    const users = getUsers(); 
    const userExists = users.some((user) => user.email === email); 

    if (userExists) {
        setSuccess('User with this email already exists. Please log in.');
      return;
    }
    saveUser({ email, password });
    setSuccess('Registration successful! You can now log in.');
    setError('');
    setEmail('');

    setPassword('');
    navigate("/login")
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
