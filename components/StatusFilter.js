import React from 'react';
import { Select } from 'antd';
import '../styles/globals.css'; 

const { Option } = Select;

const StatusFilter = ({ onFilterChange, options }) => {
  const handleChange = (value) => {
    onFilterChange(value);
  };

  return (
    <Select 
      defaultValue={options.all} 
      onChange={handleChange} 
      className="filter-select"
    >
      <Option value="All Characters">{options.all}</Option>
      <Option value="Alive">{options.alive}</Option>
      <Option value="Dead">{options.dead}</Option>
      <Option value="Unknown">{options.unknown}</Option>
    </Select>
  );
};

export default StatusFilter;