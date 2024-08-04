import React from 'react';
import './style.css';
import { Option } from '../../interfaces/ui';


interface CustomSelectProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  label: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, label }) => {
  return (
    <div className="custom-select">
      <label htmlFor="custon-name" >{label}</label>
      <select id='custon-name'  value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
