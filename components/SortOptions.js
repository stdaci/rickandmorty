import React from 'react';
import { Select } from 'antd';
import '../styles/globals.css'; 

const { Option } = Select;

const SortOptions = ({ onSortChange }) => {
  const handleChange = (value) => {
    onSortChange(value);
  };

  return (
    <Select 
      defaultValue="name" 
      onChange={handleChange} 
      className="sort-select"
    >
      <Option value="name">Sort by Name</Option>
      <Option value="origin">Sort by Origin</Option>
    </Select>
  );
};

export default SortOptions;