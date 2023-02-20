import React from 'react';
import { IInputRadioProps } from './interfaces';
const InputRadio: React.FC<IInputRadioProps> = (props) => {
  const { name, label, register, value, icon } = props;
  return (
    <div className="radioButton">
      <input
        className="radioButton__input"
        { ...register(name) }
        type="radio"
        value={ value }
        id={ value.toLocaleLowerCase() }
      />
      <label className="radioButton__label" htmlFor={ name }>{ icon && <span className="radioButton__icon"> { icon } </span> }{ label }</label>

    </div>
  );
};

export default InputRadio;