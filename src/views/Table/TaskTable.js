import React from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import DataTableTodo from '../DataTableTodo';

const TaskTable = ({ todos, handleEdit, handleDelete }) => {
  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx1dos8LThhwYE3fEciUQeNHD6_w4rL3FPTw&s';

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.title,
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
    },
    {
      name: 'Image',
      cell: (row) => (
        <img
          src={row.image || defaultImage}
          alt="Profile"
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Button variant="primary" onClick={() => handleEdit(row)}>Edit</Button>
          <Button variant="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <DataTableTodo
      columns={columns}
      data={todos}
      pagination
      responsive
      striped
      highlightOnHover
    />
  );
};

export default TaskTable;
