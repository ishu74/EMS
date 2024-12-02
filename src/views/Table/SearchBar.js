import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ setSearchText }) => {
  return (
    <InputGroup style={{ maxWidth: '350px' }}>
      <Button variant="success" className="me-4">
        Create new
      </Button>
      <FormControl
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
      />
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
    </InputGroup>
  );
};

export default SearchBar;
