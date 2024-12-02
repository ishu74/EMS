import React from 'react';
import { Spinner } from 'react-bootstrap';
//not in used
const UILoading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Spinner animation="border" variant="light" />
    </div>
  );
};

export default UILoading;
