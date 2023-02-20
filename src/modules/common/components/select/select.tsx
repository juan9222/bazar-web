import React from 'react';
import Select, { components } from 'react-select';
import { ISelectProps } from './interfaces';

const CustomSelect: React.FC<ISelectProps> = (props) => {
  const { name, selection, options, children, hasError, errorMessage, valueIsLabel, label, onChangeSelection, ...rest } = props;

  const { Option } = components;
  const IconOption = (props: any) => (
    <Option { ...props }>
      { props.data.label }
    </Option>
  );

  return (
    <div className="form-input-select">
      <label className="inputTextContainer__label" htmlFor={ name }>{ label ? <span>{ rest.required && <span className="inputTextContainer__label--required">* </span> }{ label }</span> : "" }</label>
      {
        <div className="inputTextContainer__input">
          <Select
            value={ options.find(o => o.value === selection) }
            options={ options }
            components={ { Option: IconOption } }
            className={ 'input-select' }
            name={ name }
            onChange={ onChangeSelection }
          />
          { hasError && <span className="inputTextContainer__errorMessage">{ errorMessage }</span> }
        </div>
      }
    </div>
  );
};

export default CustomSelect;