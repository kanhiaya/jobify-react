import React from 'react';

function FormRow({ type, name, value, handleChange, labelText }) {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        value={value}
        className='form-input'
        name={name}
        onChange={handleChange}
      />
    </div>
  );
}

export default FormRow;
