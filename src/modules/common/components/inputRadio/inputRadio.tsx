import React from 'react';
import { IInputRadioProps } from './interfaces';
const InputRadio: React.FC<IInputRadioProps> = (props) => {
  const { name, label, register, value } = props;
  return (
    <div className="radioButton">
      <input
        className="radioButton__input"
        { ...register(name) }
        type="radio"
        value={ value }
        id={ name }
      />
      <label className="radioButton__label" htmlFor={ name }>{ label }</label>

    </div>
  );
};

export default InputRadio;