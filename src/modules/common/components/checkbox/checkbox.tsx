import React from 'react';
import { Controller } from 'react-hook-form';
import { ICheckboxProps } from './interfaces';

const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const { name, control, label, children, ...rest } = props;
  return (
    <Controller
      control={ control }
      name={ name }
      render={ ({ field: { name, onBlur, onChange, value, ref } }) => {
        return (
          <div className="checkboxContainer">
            <input id={ name } name={ name } onBlur={ onBlur } onChange={ onChange } value={ value } ref={ ref } type="checkbox" { ...rest } />
            { children ? children : <label className="inputTextContainer__label" htmlFor={ name }>{ label }</label> }
          </div>
        );
      } }
    />
  );
};

export default Checkbox;