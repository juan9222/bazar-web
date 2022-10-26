import React from 'react';
import Button from '../../../common/components/button';
import InputFile from '../../../common/components/inputFile';
import InputText from '../../../common/components/inputText';
import ProfilePhoto from '../../../common/components/profilePhoto';
import Select from '../../../common/components/select';
import { ELarge } from '../../../common/interfaces';
import useCompanyCreation from './hooks/useCompanyCreation';

const CompanyCreation: React.FC<any> = props => {
  const { } = props;
  const {
    yearsOperations,
    incrementYO,
    decrementYO,
    userName,
    countries,
    register,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    cities,
  } = useCompanyCreation();
  return (
    <div className="cc">
      <div className="cc__banner">
        <img src="/assets/images/banner-company-creation.png" alt="company creation" />
      </div>
      <div className="cc__content">
        <div className="cc__content--form">
          <h1 className="formTitle">Complete your registration</h1>
          <p className="formText">Hi Hector, your company and your security is very important to us, that's why we need you to fill in some additional information.</p>
          <div className="verticalSpaceL"></div>
          <ProfilePhoto fullname={ userName } />
          <div className="verticalSpaceM"></div>
          <h2 className="cc__content--form--subTitle">About your company</h2>
          <div className="verticalSpaceL"></div>
          <form onSubmit={ () => { } }>
            <InputText
              register={ register }
              name={ assignInputName("companyName") }
              label={ "Company name" }
              type={ "text" }
              hasError={ hasErrorsInput("companyName") }
              errorMessage={ getMessageErrorInput("companyName") }
              autoCapitalize={ "off" }
              placeholder={ "Enter a company name" }
              autoComplete={ "off" }
              required />
            <div className='dFlex'>
              <div className="f1">
                <InputText
                  register={ register }
                  name={ assignInputName("companyAddress") }
                  label={ "Company address" }
                  type={ "text" }
                  hasError={ hasErrorsInput("companyAddress") }
                  errorMessage={ getMessageErrorInput("companyAddress") }
                  autoCapitalize={ "off" }
                  placeholder={ "Enter a company address" }
                  autoComplete={ "off" }
                  required />

              </div>
              <div className="horizontalSpaceS"></div>
              <div className="f1">
                <InputText
                  register={ register }
                  name={ assignInputName("chamberOfCommerce") }
                  label={ "EIN/Chamber of Commerce" }
                  type={ "text" }
                  hasError={ hasErrorsInput("chamberOfCommerce") }
                  errorMessage={ getMessageErrorInput("chamberOfCommerce") }
                  autoCapitalize={ "off" }
                  placeholder={ "Enter EIN" }
                  autoComplete={ "off" }
                  required />

              </div>
            </div>
            <InputText
              register={ register }
              name={ assignInputName("legalRepresentative") }
              label={ "Legal representative" }
              type={ "text" }
              hasError={ hasErrorsInput("legalRepresentative") }
              errorMessage={ getMessageErrorInput("legalRepresentative") }
              autoCapitalize={ "off" }
              placeholder={ "Enter legal representative name" }
              autoComplete={ "off" }
              required />
            <div className="dFlex jcSpaceBetween">
              <p>
                <span className='textError100'>* </span>
                <span className='labelInput'>Years in operations</span>
              </p>
              <div className="counter">
                <div onClick={ decrementYO } className="counter__btn">-</div>
                <p>{ yearsOperations }</p>
                <div onClick={ incrementYO } className="counter__btn">+</div>
              </div>
            </div>
            <div className="verticalSpaceL"></div>
            <div className="dFlex">
              <div className="f1">
                <Select
                  register={ register }
                  label={ "Country" }
                  hasError={ hasErrorsInput("country") }
                  errorMessage={ getMessageErrorInput("country") }
                  required
                  name={ assignInputName("country") }
                  placeholder={ "Select country" }
                  options={ countries }
                />
              </div>
              <div className="horizontalSpaceS"></div>
              <div className="f1">
                <Select
                  register={ register }
                  label={ "City" }
                  hasError={ hasErrorsInput("city") }
                  required
                  name={ assignInputName("city") }
                  errorMessage={ getMessageErrorInput("country") }
                  placeholder={ "Select city" }
                  options={ cities }
                />
              </div>
            </div>
            <div className="verticalSpaceL"></div>
            <h2 className="cc__content--form--subTitle">Company Documents</h2>
            <div className="verticalSpaceM"></div>
            <InputFile
              required
              label={ "The company By-Laws or equivalent document" }
              name={ "companyByLaws" }
              placeholder={ "Add document" }
            />
            <div className="verticalSpaceL"></div>
            <InputFile
              label={ "Authentication of the legal representative (opt)" }
              name={ "opt" }
              placeholder={ "Add document" }
            />
            <div className="verticalSpaceL"></div>
            <InputFile
              required
              label={ "The latest purchase order of your product" }
              name={ "purchaseOrder" }
              placeholder={ "Add document" }
            />
            <div className="verticalSpaceL"></div>
            <Button large={ ELarge.full }>
              Save
            </Button>
            <div className="verticalSpaceXL"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreation;
