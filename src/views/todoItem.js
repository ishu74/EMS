import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const TodoItem = ({ todo, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);
  const [newDueDate, setNewDueDate] = useState(todo.dueDate);

  const handleUpdate = () => {
    onUpdate({
      ...todo,
      title: newTitle,
      description: newDescription,
      dueDate: newDueDate,
    });
    setIsEditing(false);
  };

  return (
    <Card className="mb-3">
      {isEditing ? (
        <Card.Body>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Date of joining</Form.Label>
            <Form.Control
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" className="me-2" onClick={handleUpdate}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Card.Body>
      ) : (
        <Card.Body>
          <Card.Title>{todo.title}</Card.Title>
          <Card.Text>{todo.description}</Card.Text>
          <Card.Text>
            <strong>Due Date:</strong> {todo.dueDate}
          </Card.Text>
          <Button variant="primary" className="me-2" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button variant="danger" onClick={onRemove}>
            Remove
          </Button>
        </Card.Body>
      )}
    </Card>
  );
};



export default TodoItem;
