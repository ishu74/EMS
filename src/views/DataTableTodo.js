import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { getTodos } from '../application/selector/todoSelector';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { addTodo, removeTodo, updateTodo } from '../application/actions/todoAction';
import { customStyles, theme } from '../style/DataTableStyle';
import { FaSearch } from 'react-icons/fa';
import { Offcanvas } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLoadingState } from '../application/selector/ui';
import { ShimmerTable } from 'shimmer-effects-react';

const DataTableTodo = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const loading = useSelector(getLoadingState);
  const [searchText, setSearchText] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx1dos8LThhwYE3fEciUQeNHD6_w4rL3FPTw&s';

  // const allowedDomains = ['test.com', 'test.org', 'test.net', 'automatebuddy.com'];
  const allowedDomains = new RegExp(
    '^.*@((?!gmail\\.com|yahoo\\.com|outlook\\.com|hotmail\\.com|aol\\.com|icloud\\.com|live\\.com)[a-zA-Z0-9-]+\\.[a-zA-Z]{2,})$',
    'i')
  const [taskDetails, setTaskDetails] = useState({
    id: null,
    title: '',
    email: '',
    description: '',
    dueDate: '',
    image: defaultImage,
  });

  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [dueDateError, setDueDateError] = useState('');

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Address',
      selector: (row) => row.description,
    },
    {
      name: 'Date of Joining',
      selector: (row) => row.dueDate,
      sortable: true,
    },
    {
      name: 'Image',
      cell: (row) => (
        <img
          src={row.image || defaultImage}
          alt="Profile"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row.id, row.title)}
            disabled={deletingId === row.id}
            className="me-2"
          >
            {deletingId === row.id ? 'Delete' : 'Delete'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleEdit(row)}
            disabled={deletingId === row.id}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchText.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchText.toLowerCase()) ||
    todo.dueDate.toLowerCase().includes(searchText.toLowerCase()) ||
    todo.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id, title) => {
    if (deletingId) return;
    setDeletingId(id);
    toast.info(
      <div>
        <p>{title},are you sure you want to delete?</p>
        <div className="d-flex justify-content-end">
          <Button
            size="sm"
            variant="danger"
            className="me-2"
            onClick={() => {
              dispatch(removeTodo(id));
              setDeletingId(null);
              toast.dismiss();
              toast.success('Details deleted successfully!', { position: 'top-right' });
            }}
          >
            Confirm
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setDeletingId(null);
              toast.dismiss();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setTaskDetails({
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      email: task.email,
      image: task.image || defaultImage,
    });
    setShowSidebar(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'email') {
      if (!validateWorkEmail(value)) {
        setEmailError('Please enter a valid work email from an allowed domain.');
      } else {
        setEmailError('');
      }
    }

    if (name === 'title') {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setNameError('Only alphabetic characters are allowed.');
      } else {
        setNameError('');
      }
    }

    if (name === 'description') {
      if (value.trim()) {
        setDescriptionError('');
      }
    }

    if (name === 'dueDate') {
      if (value) {
        setDueDateError('');
      }
    }
  };

  const validateWorkEmail = (email) => {
    // const domain = email.split('@')[1];
    return allowedDomains.test(email);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTaskDetails((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTask = () => {
    let valid = true;

    if (!taskDetails.title) {
      setNameError('Please enter the name.');
      valid = false;
    }

    if (!taskDetails.email) {
      setEmailError('Please enter the email.');
      valid = false;
    }

    if (!taskDetails.description) {
      setDescriptionError('Please enter the address.');
      valid = false;
    }

    if (!taskDetails.dueDate) {
      setDueDateError('Please enter the date of joining.');
      valid = false;
    }

    if (valid) {
      dispatch(addTodo({ ...taskDetails, id: Date.now().toString() }));
      toast.success('Details added successfully!', { position: 'top-right' });
      resetSidebar();
    }
  };

  const handleUpdateTask = () => {
    let valid = true;

    if (!taskDetails.title) {
      setNameError('Please enter the name.');
      valid = false;
    }

    if (!taskDetails.email) {
      setEmailError('Please enter the email.');
      valid = false;
    }

    if (!taskDetails.description) {
      setDescriptionError('Please enter the address.');
      valid = false;
    }

    if (!taskDetails.dueDate) {
      setDueDateError('Please enter the date of joining.');
      valid = false;
    }

    if (valid) {
      dispatch(updateTodo(taskDetails));
      toast.success('Details updated successfully!', { position: 'top-right' });
      resetSidebar();
    }
  };

  const resetSidebar = () => {
    setShowSidebar(false);
    setIsEditing(false);
    setTaskDetails({
      id: null,
      title: '',
      email: '',
      description: '',
      dueDate: '',
      image: defaultImage,
    });
    setEmailError('');
    setNameError('');
    setDescriptionError('');
    setDueDateError('');
  };

  return (
    <div className="container my-4">
      <ToastContainer />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employee Listings</h2>
        <InputGroup style={{ maxWidth: '350px' }}>
          <Button
            variant="success"
            className="me-4"
            onClick={() => {
              setIsEditing(false);
              setShowSidebar(true);
            }}
          >
            Create new
          </Button>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="form-control"
          />
          <span className="input-group-text">
            <FaSearch />
          </span>
        </InputGroup>
      </div>

      {loading ? (
        <ShimmerTable mode="light" row={5} col={4} border={1} borderColor={"#F0F0F0"} rounded={0.25} rowGap={50} colGap={10} colPadding={[10, 15, 10, 15]} />
      ) : (
        <DataTable
          columns={columns}
          data={filteredTodos}
          pagination
          responsive
          striped
          highlightOnHover
          theme={theme}
          customStyles={customStyles}
        />
      )}

      <Offcanvas show={showSidebar} onHide={resetSidebar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{isEditing ? 'Update' : 'Add New'} Employee</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center mb-4">
            <img
              src={taskDetails.image}
              alt="Profile"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <Form.Group controlId="formImage" className="mt-3">
              <Form.Control
                type="file"
                onChange={handleImageUpload}
                className="form-control-sm" // Make the input smaller
                style={{ maxWidth: '150px', margin: '0 auto' }} // Limit the width and center it
              />
            </Form.Group>

          </div>

          <Form>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter name"
                value={taskDetails.title}
                onChange={handleInputChange}
                isInvalid={!!nameError}
              />
              {nameError && <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={taskDetails.email}
                onChange={handleInputChange}
                isInvalid={!!emailError}
              />
              {emailError && <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Enter address"
                value={taskDetails.description}
                onChange={handleInputChange}
                isInvalid={!!descriptionError}
              />
              {descriptionError && <Form.Control.Feedback type="invalid">{descriptionError}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group controlId="formDueDate" className="mb-3">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={taskDetails.dueDate}
                onChange={handleInputChange}
                isInvalid={!!dueDateError}
              />
              {dueDateError && <Form.Control.Feedback type="invalid">{dueDateError}</Form.Control.Feedback>}
            </Form.Group>

            {/* <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
            </Form.Group> */}

            <div className="text-end">
              {isEditing ? (
                <Button variant="primary" onClick={handleUpdateTask}>
                  Update
                </Button>
              ) : (
                <Button variant="success" onClick={handleAddTask}>
                  Save
                </Button>
              )}
              <Button variant="secondary" onClick={resetSidebar} className="ms-2">
                Cancel
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DataTableTodo;
