import React from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';

const OffcanvasForm = ({
  showSidebar,
  setShowSidebar,
  isEditing,
  taskDetails,
  setTaskDetails,
  dispatch,
  addTodo,
  updateTodo,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (isEditing) {
      dispatch(updateTodo(taskDetails));
    } else {
      dispatch(addTodo({ ...taskDetails, id: Date.now().toString() }));
    }
    setShowSidebar(false);
  };

  return (
    <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{isEditing ? 'Update' : 'Add New'} Employee</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={taskDetails.title}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={taskDetails.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={taskDetails.description}
              onChange={handleInputChange}
              placeholder="Enter address"
            />
          </Form.Group>

          <Form.Group controlId="formDueDate">
            <Form.Label>Date of Joining</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={taskDetails.dueDate}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? 'Update' : 'Save'}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasForm;
