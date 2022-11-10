import { Controller } from "react-hook-form";
import useInputTextStyles from "./hooks/useInputTextareaStyles";
import { IInputTextareaProps } from "./interfaces";

const InputTextarea: React.FC<IInputTextareaProps> = (props) => {
  const { name, label, rows, icon, onClickIcon, register, hasError, errorMessage, onChange, value, control, required, placeholder, } = props;
  const { getClassNameInputTextByError } = useInputTextStyles(props);
  return (
    <div className="inputTextareaContainer">
      <label className="inputTextareaContainer__label" htmlFor={ name }>{ label ? <span>{ required && <span className="inputTextareaContainer__label--required">* </span> }{ label }</span> : "" }</label>
      <div className="inputTextareaContainer__input">
        { register ? (
          <textarea className={ getClassNameInputTextByError() } { ...register(name) } id={ name } rows={ rows ?? 3 } required={ required } />
        ) : (
          <Controller
            name={ name }
            control={ control }
            render={ ({ field: { onChange, onBlur, value, name, ref } }) => {
              return (
                <textarea className={ getClassNameInputTextByError() } onChange={ onChange } value={ value } name={ name } id={ name } rows={ rows } required={ required } placeholder={ placeholder } />
              );
            } }
          />
        )
        }
        { icon &&
          <div onClick={ onClickIcon } className="inputTextareaContainer__input--icon">
            { icon }
          </div>
        }
      </div>
      { hasError && <span className="inputTextareaContainer__errorMessage">{ errorMessage }</span> }
    </div>
  );
};

export default InputTextarea;