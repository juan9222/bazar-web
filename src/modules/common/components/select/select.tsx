import React from 'react';
import useInputTextStyles from '../inputText/hooks/useInputTextStyles';
import { ISelectProps } from './interfaces';

const Select: React.FC<ISelectProps> = (props) => {
  const { name, register, options, children, hasError, errorMessage, valueIsLabel, label, ...rest } = props;
  const { getClassNameInputTextByError } = useInputTextStyles({ hasError: hasError ?? false });

  return (
    <div className="">
      <label className="inputTextContainer__label" htmlFor={ name }>{ label ? <span>{ rest.required && <span className="inputTextContainer__label--required">* </span> }{ label }</span> : "" }</label>

      {
        register ? (
          <div className="inputTextContainer__input">
            <select className={ getClassNameInputTextByError() } { ...register(name) } { ...rest }>
              <option disabled selected>{ rest.placeholder }</option>
              { options.map(op => (
                <option key={ op.value } value={ valueIsLabel ? op.label : op.value }>
                  { op.label }
                </option>
              )) }
            </select>
            { hasError && <span className="inputTextContainer__errorMessage">{ errorMessage }</span> }

          </div>
        ) : (

          <select className={ getClassNameInputTextByError() } name={ name } { ...rest }>
            <option disabled selected>{ rest.placeholder }</option>
            { options.map(op => (
              <option key={ op.value } value={ valueIsLabel ? op.label : op.value }>
                { op.label }
              </option>
            )) }
          </select>
        )
      }
    </div>
  );
};

export default Select;