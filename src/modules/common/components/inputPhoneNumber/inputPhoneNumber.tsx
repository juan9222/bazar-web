import React from 'react';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import { IInputPhoneNumberProps } from './interfaces';

const InputPhoneNumber: React.FC<IInputPhoneNumberProps> = props => {
  const { control, name, labelCountry, labelPhone, hasError, errorMessage, required } = props;
  return (
    <div className="phoneInputContainer">

      <div className="phoneInputContainer__label">

        <p className='inputTextContainer__label'>
          <span>{ required && <span className="inputTextContainer__label--required">* </span> }{ labelCountry }</span>
        </p>

        <p className='inputTextContainer__label'>{ labelPhone }</p>

      </div>
      <PhoneInputWithCountry
        focusInputOnCountrySelection={ false }
        name={ name }
        control={ control }
        className="phoneInputCountry"
        autoComplete={ "off" }
      />
      { hasError && <span className="inputTextContainer__errorMessage">{ errorMessage }</span> }
    </div>
  );
};

export default InputPhoneNumber;