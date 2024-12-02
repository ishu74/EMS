import { createTheme } from 'react-data-table-component';

const customStyles = {
  rows: {
    style: {
      minHeight: '56px', 
    },
  },
  headCells: {
    style: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  },
  cells: {
    style: {
      padding: '8px', 
    },
  },
};

const theme = createTheme('myTheme', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#ffffff',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
});

export  {customStyles,theme}
