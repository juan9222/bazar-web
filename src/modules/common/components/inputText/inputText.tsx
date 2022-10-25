import React from "react";
import { IInputTextProps } from "./interfaces";
import useInputTextStyles from './hooks/useInputTextStyles';
import { Controller } from "react-hook-form";

const InputText: React.FC<IInputTextProps> = (props) => {
  const { name, label, icon, required, onClickIcon, register, hasError, errorMessage, onChange, value, control, type, ...rest } = props;
  const { getClassNameInputTextByError } = useInputTextStyles(props);
  return (
    <div className="inputTextContainer">
      <label className="inputTextContainer__label" htmlFor={ name }>{ label ? <span>{ required && <span className="inputTextContainer__label--required">* </span> }{ label }</span> : "" }</label>
      <div className="inputTextContainer__input">
        { register ? (
          <input className={ getClassNameInputTextByError() } type={ type ?? "text" } { ...register(name) } id={ name }  { ...rest } />
        ) : (
          <Controller
            name={ name }
            control={ control }
            render={ ({ field: { onChange, onBlur, value, name, ref } }) => {
              return (
                <input ref={ ref } className={ getClassNameInputTextByError() } onChange={ onChange } value={ value } onBlur={ onBlur } type={ type ?? "text" } name={ name } id={ name }  { ...rest } />
              );
            } }
          />
        )
        }
        { icon &&
          <div onClick={ onClickIcon } className="inputTextContainer__input--icon">
            { icon }
          </div>
        }
      </div>
      { hasError && <span className="inputTextContainer__errorMessage">{ errorMessage }</span> }
    </div>
  );
};

export default InputText;
