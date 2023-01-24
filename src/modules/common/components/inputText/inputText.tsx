import React from "react";
import { IInputTextProps } from "./interfaces";
import useInputTextStyles from './hooks/useInputTextStyles';
import { Controller } from "react-hook-form";
import { IoMdAlert } from 'react-icons/io';

const InputText: React.FC<IInputTextProps> = (props) => {
  const { name, label, hasTooltip, children, icon, iconLeft, required, onClickIcon, register, hasError, errorMessage, onChange, value, control, type, ...rest } = props;
  const { getClassNameInputTextByError } = useInputTextStyles({ hasError: hasError ?? false });
  return (
    <div className="inputTextContainer">
      <div className="content-input-label">
        <label className="inputTextContainer__label" htmlFor={ name }>
          { label ? <span>{ required && <span className="inputTextContainer__label--required">*</span> }
            { label }</span> : "" }
        </label>
        { hasTooltip && <div className="message-hover"><IoMdAlert />{ children }</div> }
      </div>
      <div className="inputTextContainer__input">
        { iconLeft &&
          <div onClick={ onClickIcon } className="inputTextContainer__input--icon-left">
            { iconLeft }
          </div>
        }
        { register ? (
          <input className={ getClassNameInputTextByError() } type={ type ?? "text" } { ...register(name) } id={ name }  { ...rest } />
        ) : control ? (
          <Controller
            name={ name }
            control={ control }
            render={ ({ field: { onChange, onBlur, value, name, ref } }) => {
              return (
                <input ref={ ref } className={ getClassNameInputTextByError() } onChange={ onChange } value={ value } onBlur={ onBlur } type={ type ?? "text" } name={ name } id={ name }  { ...rest } />
              );
            } }
          />
        ) : (
          <input className={ getClassNameInputTextByError() } onChange={ onChange } value={ value } type={ type ?? "text" } name={ name } id={ name } { ...rest } />
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
