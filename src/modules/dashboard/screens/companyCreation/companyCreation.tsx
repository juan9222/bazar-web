import React from 'react';
import { AiFillCheckCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import Button from '../../../common/components/button';
import { EBtnVisibleType } from '../../../common/components/button/interfaces';
import InputFile from '../../../common/components/inputFile';
import InputText from '../../../common/components/inputText';
import Modal from '../../../common/components/modal';
import ModalFile from '../../../common/components/modalFile';
import ProfilePhoto from '../../../common/components/profilePhoto';
import Select from '../../../common/components/select';
import { ELarge } from '../../../common/interfaces';
import useCompanyCreation from './hooks/useCompanyCreation';

const CompanyCreation: React.FC<any> = () => {
  const {
    yearsOperations,
    incrementYO,
    decrementYO,
    onChangeY0,
    user,
    countries,
    register,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    cities,
    showAvatars,
    onShowAvatars,
    onHideAvatars,
    avatars,
    avatar,
    onSelectAvatar,
    setAvatarModal,
    avatarModal,
    handleSubmit,
    submitForm,
    setCompanyByLawsFile,
    setOptFile,
    setPurchaseOrderFile,
    loading,
    showConfirmationModal,
    setShowConfirmationModal,
    showCongratulationsModal,
    onCreateProduct,
    onCreateProductLater,
  } = useCompanyCreation();

  return (
    <div className="cc">
      <div className="cc__banner">
        <img src="/assets/images/banner-company-creation.png" alt="company creation" />
      </div>
      <div className="cc__content">
        <div className="cc__content--form">
          <h1 className="formTitle">Complete your registration</h1>
          <p className="formText">Hi { user.firstName }, your company and your security is very important to us, that's why we need you to fill in some additional information.</p>
          <div className="verticalSpaceL"></div>
          <ProfilePhoto url={ avatar.imageUrl } fullname={ user.fullName } onPressEdit={ onShowAvatars } />
          <div className="verticalSpaceM"></div>
          <h2 className="cc__content--form--subTitle">About your company</h2>
          <div className="verticalSpaceL"></div>
          <form>
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
                <input { ...register("yearsInOperations") } value={ yearsOperations } onChange={ (event) => onChangeY0(event.target.value) } type="text" />
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
              onChangeFile={ setCompanyByLawsFile }
              footer="This form accepts PDF, JPEG, JPG, PNG files up to 10 MB."
            />
            <div className="verticalSpaceL"></div>
            <InputFile
              label={ "Authentication of the legal representative (opt)" }
              name={ "opt" }
              placeholder={ "Add document" }
              onChangeFile={ setOptFile }
              footer="This form accepts PDF, JPEG, JPG, PNG files up to 10 MB."
            />
            <div className="verticalSpaceL"></div>
            <InputFile
              required
              label={ "The latest purchase order of your product" }
              name={ "purchaseOrder" }
              placeholder={ "Add document" }
              onChangeFile={ setPurchaseOrderFile }
              footer="This form accepts PDF, JPEG, JPG, PNG files up to 10 MB."
            />
            <div className="verticalSpaceL"></div>
          </form>
          <Button type='button' onClick={ () => setShowConfirmationModal(true) } large={ ELarge.full } disabled={ loading }>
            { loading ? <AiOutlineLoading3Quarters className="loaderIcon" /> : "Save" }
          </Button>
          <div className="verticalSpaceXL"></div>
          {/* Modal Avatar */ }
          <Modal title='Selet your avatar' width='503px' closed={ !showAvatars } continueDisabled hideFooter showCloseIcon onClose={ () => {
            onHideAvatars();
            if (!avatar.uuid) {
              onSelectAvatar({
                imageName: "",
                imageUrl: "",
                uuid: ""
              });
            }
          } }>
            <div className="avatars">
              {
                avatars.map((av: any) => {
                  return (
                    <ProfilePhoto key={ av.id } avatar={ av } url={ av.imageUrl } selected={ av.uuid === avatarModal.uuid } onlyPhoto onSelectAvatar={ () => setAvatarModal(av) } />
                  );
                })
              }
            </div>
            <div className="dFlex f1 jcCenter">
              <Button

                onClick={ () => {
                  onHideAvatars();
                  onSelectAvatar(avatarModal);
                } } visibleType={ EBtnVisibleType.outline } >Select avatar</Button>
            </div>
          </Modal>
          {/* Modal Confirmation */ }
          <Modal title="" continueText='Save' width='560px' closed={ !showConfirmationModal } showCloseIcon={ false } onClose={ () => setShowConfirmationModal(false) } onContinue={ handleSubmit(submitForm) } loading={ loading }>
            <div className="verticalSpaceS"></div>
            <h3 className='textPrimary300 textModalTitle'>Do you want to continue?</h3>
            <div className="verticalSpaceL"></div>
            <p className='textModalDesc'>Are yo sure to save your changes? Once submitted you will not be able to modify them until they have been reviewed by our Bazar team.</p>
          </Modal>
          {/* Modal Congratulations */ }
          <Modal title="" continueText='Create product now' cancelText='Create product later' width='590px' closed={ !showCongratulationsModal } showCloseIcon={ false } onClose={ () => setShowConfirmationModal(false) } onContinue={ onCreateProduct } onCancel={ onCreateProductLater } loading={ loading }>
            <div className="verticalSpaceS"></div>
            <h3 className='textPrimary300 textModalTitle dFlex aICenter'> <AiFillCheckCircle className='textSuccess200' />             <div className="horizontalSpaceS"></div>
              Congratulations</h3>
            <div className="verticalSpaceL"></div>
            <p className='textModalDesc'>Your profile is almost ready, it just needs a verification by our team, it won't take long! <b>You can create your product list, while waiting for our validation.</b></p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreation;
