import React from 'react';
import { AiFillCheckCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import Button from '../../../common/components/button';
import { EBtnVisibleType } from '../../../common/components/button/interfaces';
import InputFile from '../../../common/components/inputFile';
import InputText from '../../../common/components/inputText';
import Modal from '../../../common/components/modal';
import ProfilePhoto from '../../../common/components/profilePhoto';
import Select from '../../../common/components/select';
import { ELarge } from '../../../common/interfaces';
import useCompanyCreation from './hooks/useCompanyCreation';
import { Container, Row, Col } from 'react-bootstrap';
import { useUser } from '../../layouts/dashboardLayout/dashboardLayout';

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
    selectedCountry,
    selectedCity,
    onChangeCountry,
    onChangeCity,
    isDirty,
    isValid
  } = useCompanyCreation();

  const { authenticatedUser } = useUser();

  const isBuyer = authenticatedUser?.role === 'Buyer';

  return (
    <Container fluid className="cc">
      <Row>
        <Col md={ 4 } className='block__left'>
          <img src="/assets/images/banner-company-creation.png" alt="company creation" />
        </Col>
        <Col md={ 8 } className='block__right'>
          <div className="cc__content">
            <div className="cc__content--form">
              <Row>
                <Col>
                  <h1 className="formTitle">Complete your registration</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="formText">Hi { user.firstName }, your company and your security is very important to us, that's why we need you to fill in some additional information.</p>
                </Col>
                <div className="verticalSpaceL"></div>
              </Row>
              <Row>
                <Col>
                  <ProfilePhoto url={ avatar.imageUrl } fullname={ user.fullName } role={ authenticatedUser?.role } onPressEdit={ onShowAvatars } />
                </Col>
                <div className="verticalSpaceL"></div>
              </Row>
              <Row>
                <Col>
                  <h2 className="cc__content--form--subTitle">About your company</h2>
                </Col>
                <div className="verticalSpaceL"></div>
              </Row>
              <form>
                <Row>
                  <Col>
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
                  </Col>
                  <div className="verticalSpaceL"></div>
                </Row>
                <Row>
                  <Col className="form__select">
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
                  </Col>
                  <Col>
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
                  </Col>
                  <div className="verticalSpaceL"></div>
                </Row>
                <Row>
                  <Col>
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
                  </Col>
                  <div className="verticalSpaceL"></div>
                </Row>
                <Row>
                  <Col>
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
                  </Col>
                  <div className="verticalSpaceL"></div>
                </Row>
                <Row>
                  <Col className="form__select" >
                    <Select
                      selection={ selectedCountry }
                      onChangeSelection={ (option: unknown) => { onChangeCountry(option); } }
                      label={ "Country" }
                      hasError={ hasErrorsInput("country") }
                      errorMessage={ getMessageErrorInput("country") }
                      required
                      name={ assignInputName("country") }
                      placeholder={ "Select country" }
                      options={ countries }
                    />
                  </Col>
                  <Col md>
                    <Select
                      selection={ selectedCity }
                      onChangeSelection={ (option: unknown) => { onChangeCity(option); } }
                      label={ "City" }
                      hasError={ hasErrorsInput("city") }
                      required
                      name={ assignInputName("city") }
                      errorMessage={ getMessageErrorInput("country") }
                      placeholder={ "Select city" }
                      options={ cities }
                    />
                  </Col>
                </Row>
                <div className="verticalSpaceL"></div>
                <Row>
                  <Col>
                    <h2 className="cc__content--form--subTitle">Company Documents</h2>
                  </Col>
                  <div className="verticalSpaceL"></div>
                </Row>
                <Row>
                  <Col>
                    <InputFile
                      required
                      label={ "The company By-Laws or equivalent document" }
                      name={ "companyByLaws" }
                      placeholder={ "Add document" }
                      onChangeFile={ setCompanyByLawsFile }
                      footer="This form accepts PDF, JPEG, JPG, PNG files up to 10 MB."
                    />
                  </Col>
                  <div className="verticalSpaceL"></div>
                </Row>
                <Row>
                  <Col>
                    <InputFile
                      label={ "Authentication of the legal representative (opt)" }
                      name={ "opt" }
                      placeholder={ "Add document" }
                      onChangeFile={ setOptFile }
                      footer="This form accepts PDF, JPEG, JPG, PNG files up to 10 MB."
                    />
                  </Col>
                  <div className="verticalSpaceL"></div>
                </Row>
                <Row>
                  <Col>
                    <InputFile
                      required
                      label={ "The latest purchase order of your product" }
                      name={ "purchaseOrder" }
                      placeholder={ "Add document" }
                      onChangeFile={ setPurchaseOrderFile }
                      footer="This form accepts PDF, JPEG, JPG, PNG files up to 10 MB."
                    />
                  </Col>
                  <div className="verticalSpaceL"></div>
                </Row>
              </form>
              <Row>
                <Col>
                  <Button type='button' onClick={ () => setShowConfirmationModal(true) } large={ ELarge.full } disabled={ !isDirty || !isValid }>
                    { loading ? <AiOutlineLoading3Quarters className="loaderIcon" /> : "Save" }
                  </Button>
                </Col>
              </Row>
              <div className="verticalSpaceXL"></div>
              <div className='modal-avatars'>
                {/* Modal Avatar */ }
                <Modal title='Select your avatar' width='503px' closed={ !showAvatars } continueDisabled hideFooter showCloseIcon onClose={ () => {
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
              </div>

              {/* Modal Confirmation */ }
              <Modal title="" continueText='Save' width='560px' closed={ !showConfirmationModal } showCloseIcon={ false } onClose={ () => setShowConfirmationModal(false) } onContinue={ handleSubmit(submitForm) } loading={ loading }>
                <div className="verticalSpaceS"></div>
                <h3 className='textPrimary300 textModalTitle'>Do you want to continue?</h3>
                <div className="verticalSpaceL"></div>
                <p className='textModalDesc'>Are yo sure to save your changes? Once submitted you will not be able to modify them until they have been reviewed by our Bazar team.</p>
              </Modal>
              {/* Modal Congratulations */ }
              <Modal title="" continueText={ isBuyer ? 'Continue' : 'Create product now' } cancelText='Create product later' width='590px' closed={ !showCongratulationsModal } showCloseIcon={ false } onClose={ () => setShowConfirmationModal(false) } onContinue={ isBuyer ? onCreateProductLater : onCreateProduct } onCancel={ onCreateProductLater } cancelHidden={ isBuyer } loading={ loading }>
                < div className="verticalSpaceS"></div>
                <h3 className='textPrimary300 textModalTitle dFlex aICenter'> <AiFillCheckCircle className='textSuccess200' />             <div className="horizontalSpaceS"></div>
                  Congratulations</h3>
                <div className="verticalSpaceL"></div>
                <p className='textModalDesc'>Your profile is almost ready, it just needs a verification by our team, it won't take long! { isBuyer && (<b>You can create your product list, while waiting for our validation.</b>) }</p>
              </Modal>
            </div>
          </div>
        </Col>
      </Row >
    </Container >
  );
};

export default CompanyCreation;