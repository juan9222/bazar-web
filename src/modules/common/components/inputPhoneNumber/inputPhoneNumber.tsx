import React from 'react';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import IconArrowDownSelect from '../../../../assets/svg/icons/iconArrowDownSelect';
import { IInputPhoneNumberProps } from './interfaces';

const InputPhoneNumber: React.FC<IInputPhoneNumberProps> = props => {
  const { control, name, } = props;
  // console.log({ countries: getCountries()[0], callingCode: getCountryCallingCode("US") });
  return (
    <div className="phoneInputContainer">
      <div className="phoneInputContainer__arrowDown">
        <IconArrowDownSelect />
      </div>
      <PhoneInputWithCountry
        focusInputOnCountrySelection={ false }
        name={ name }
        control={ control }
        className="phoneInputCountry"
        autoComplete={ "off" }
      />
    </div>
  );
};

export default InputPhoneNumber;