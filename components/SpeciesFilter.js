import React from 'react';
import { Select } from 'antd';
import '../styles/globals.css';

const { Option } = Select;

const SpeciesFilter = ({ onFilterChange, options }) => {
  const handleChange = (value) => {
    onFilterChange(value);
  };

  return (
    <Select 
      defaultValue={options.all} 
      onChange={handleChange} 
      className="filter-select"
    >
      <Option value="All Species">{options.all}</Option>
      <Option value="Human">{options.human}</Option>
      <Option value="Alien">{options.alien}</Option>
      <Option value="Unknown">{options.unknown}</Option>
    </Select>
  );
};

export default SpeciesFilter;