import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { getUsers, updateUserPassword } from '../../Infrastructure/services/api/AuthStorage';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleReset = (e) => {
    e.preventDefault();
    const users = getUsers();
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      updateUserPassword(email, newPassword);
      setMessage('Password reset successful! You can now log in.');
      navigate('/login')
    } else {
      setMessage('Email not found.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Reset Password</h2>
      {message && <Alert variant={message.includes('successful') ? 'success' : 'danger'}>{message}</Alert>}
      <Form onSubmit={handleReset}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
