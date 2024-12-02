import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../application/actions/todoAction';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '' || dueDate.trim() === '') {
      alert('All fields are required.');
      return;
    }
    const newTodo = {
      id: Date.now(),
      title,
      description,
      dueDate,
    };
    dispatch(addTodo(newTodo));
    toast.success("Added Successfully!")
   
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <Container className="my-4">
      <h2 style={{textAlign:"center", marginBottom:"2px"}}>Add Your Details</h2>
     < ToastContainer /> 
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formDueDate">
              <Form.Label>Date of joining</Form.Label>
              <Form.Control
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Your Address"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};


export default AddTodo;
