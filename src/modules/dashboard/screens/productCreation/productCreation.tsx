import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import Button from "../../../common/components/button/button";
import { EBtnVisibleType } from "../../../common/components/button/interfaces";
import Checkbox from "../../../common/components/checkbox/checkbox";
import InputFile from "../../../common/components/inputFile";
import InputText from "../../../common/components/inputText/inputText";
import InputTextarea from "../../../common/components/inputTextarea";
import Modal from "../../../common/components/modal";
import Select from "../../../common/components/select";
import TabGroup from "../../../common/components/tab";
import Toggle from "../../../common/components/toggle";
import { ELarge } from "../../../common/interfaces";
import useCreateProduct from "./hooks/useProductCreation";

const ProductCreation: React.FC<any> = () => {
  const {
    control,
    register,
    handleSubmit,
    submitForm,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    handleTabSwitch,
    activeTabIndex,
    setActiveTabIndex,
    showCancellationModal,
    setShowCancellationModal,
    showConfirmationModal,
    setShowConfirmationModal,
    showConfirmationNoCertModal,
    setShowConfirmationNoCertModal,
    showCongratulationsModal,
    showCongratulationsNoCertModal,
    products,
    productTypes,
    varieties,
    sustainabilityCertificationsItems,
    incoterms,
    minimumOrders,
    certifications,
    noCertificatesSelected,
    onChangeCertificationCheckbox,
    onChangeIncotermCheckbox,
    assistanceNeeded,
    OnChangeAssistanceNeeded,
    displayPictures,
    onChangeProductPictures,
    onRemoveProductPicture,
    onChangeCertificationFile,
    onCreateProduct,
  } = useCreateProduct();

  const tabStyle = {
    padding: "0.5rem",
    margin: "0.5rem",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    background: "none",
    color: "#023047",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  const dropHandler = (ev: any) => {
    // console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    onChangeProductPictures(ev.dataTransfer.files);

  };
  const dragOverHandler = (ev: any) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  };

  const hiddenFileInput = React.useRef<any>();

  const onChangeInputFile = (event: any) => {
    const fileObj = event.target.files && event.target.files;
    onChangeProductPictures(fileObj);
  };

  return (
    <div className="cc">
      <div className="cc__banner">
        <img src="/assets/images/banner-product-creation.png" alt="bazar Auth" />
      </div>
      <div className="cc__content">
        <div className="cc__content--form">
          <h1 className="formTitle">Let's create your product</h1>
          <p className="formText">This is where we create a contract with terms and conditions that our network of buyers will see once approved</p>
          <div className="verticalSpaceL" />
          <form>
            <div className="">
              <TabGroup
                tabs={ ['1. Create product', '2. Upload certificates'] }
                currentTabIndex={ activeTabIndex }
                handleTabSwitch={ handleTabSwitch }
                disabled
                style={ tabStyle } />
            </div>
            <div className="panels">
              { activeTabIndex === 0 && (
                <section className={ `panel__${ activeTabIndex === 0 ? "active" : "inactive" }` }>
                  <div>
                    <div className="scroll-container">
                      <div className="gridscroll">
                        { displayPictures.length > 0 &&
                          displayPictures.map((picture, index) => (
                            <div className="image-wrapper">
                              <img src={ picture } alt="preview" />
                              <span className="close" onClick={ () => { onRemoveProductPicture(index); } }></span>
                            </div>
                          ))
                        }
                        { displayPictures.length < 5 && (
                          <div className="modal-file--content">
                            <input
                              ref={ hiddenFileInput }
                              type="file"
                              accept={ ".pdf,.jpeg,.jpg,.png" }
                              onChange={ onChangeInputFile }
                              multiple
                              hidden
                            />
                            <div
                              onClick={ () => {
                                hiddenFileInput?.current && hiddenFileInput.current.click();
                              } }
                              className="input"
                              onDrop={ dropHandler }
                              onDragOver={ dragOverHandler }>
                              <b>Add photos</b>
                            </div>
                          </div>) }
                      </div>
                    </div>
                    <p>Select your product photos { displayPictures?.length }/5</p>
                    <p className="label"> This form accepts JPEG, JPG, PNG files up to 10 MB.</p>
                  </div>


                  {/* { displayPictures && displayPictures.map(picture => <img src={ picture } alt="preview" />) }
                  <InputFile
                    label={ "Select your product photos." }
                    name={ assignInputName("productPictures") }
                    placeholder={ "Select your product photos" }
                    accept={ ".jpg, .png, .jpeg" }
                    onChangeFile={ setProductPictures }
                    footer="This form accepts JPEG, JPG, PNG files up to 10 MB."
                    multiple
                    required
                  /> */}
                  <div className="verticalSpaceL" />
                  <hr />
                  <div className="verticalSpaceL" />
                  <Select
                    register={ register }
                    label={ "Product" }
                    hasError={ hasErrorsInput("product") }
                    errorMessage={ getMessageErrorInput("product") }
                    name={ assignInputName("product") }
                    placeholder={ "Select product" }
                    options={ products }
                    required />
                  <div className="verticalSpaceL" />
                  <div className='dFlex'>
                    <div className="f1">
                      <Select
                        register={ register }
                        label={ "Product Type" }
                        hasError={ hasErrorsInput("productType") }
                        errorMessage={ getMessageErrorInput("productType") }
                        name={ assignInputName("productType") }
                        placeholder={ "Select product type" }
                        options={ productTypes }
                        required />
                    </div>
                    <div className="horizontalSpaceS"></div>
                    <div className="f1">
                      <Select
                        register={ register }
                        label={ "Varieties" }
                        hasError={ hasErrorsInput("varieties") }
                        errorMessage={ getMessageErrorInput("varieties") }
                        name={ assignInputName("varieties") }
                        placeholder={ "Select a category" }
                        options={ varieties }
                        required />
                    </div>
                  </div>
                  <div className="verticalSpaceL" />
                  <InputText
                    register={ register }
                    name={ assignInputName("productionCapacity") }
                    label={ "What is your production capacity per year? (kg)" }
                    type={ "number" }
                    hasError={ hasErrorsInput("productionCapacity") }
                    errorMessage={ getMessageErrorInput("productionCapacity") }
                    placeholder={ "E.g. 1800" }
                    required />
                  <InputText
                    register={ register }
                    name={ assignInputName("dateInPort") }
                    label={ "Date in port" }
                    type={ "date" }
                    hasError={ hasErrorsInput("dateInPort") }
                    errorMessage={ getMessageErrorInput("dateInPort") }
                    hasTooltip
                    required />
                  <div className='dFlex'>
                    <div className="f1">
                      <label className="productLabel"><span className="required">* </span>What sustainability certifications do you have? </label>
                    </div>
                  </div>
                  <div className="gridAuto">
                    { sustainabilityCertificationsItems.map((certification: { label: string; value: string; }) => {
                      return (
                        <Checkbox
                          control={ control }
                          label={ certification.label }
                          name={ certification.value }
                          value={ certification.value }
                          key={ certification.value }
                          checked={ certifications.indexOf(certification.value) >= 0 || (certification.label === "No certificate" && noCertificatesSelected) }
                          onChange={ onChangeCertificationCheckbox } />
                      );
                    }) }
                  </div>
                  <div className="verticalSpaceL" />
                  <InputText
                    register={ register }
                    name={ assignInputName("companyAssociation") }
                    label={ "Specify your company's guild or association" }
                    type={ "text" }
                    hasError={ hasErrorsInput("companyAssociation") }
                    errorMessage={ getMessageErrorInput("companyAssociation") }
                    placeholder={ "Write your associations" }
                    hasTooltip />
                  <div className="verticalSpaceS" />
                  <hr />
                  <div className="verticalSpaceL" />
                  <InputText
                    register={ register }
                    name={ assignInputName("saleCapacity") }
                    label={ "How much do you have available for sale? (kg)" }
                    type={ "number" }
                    hasError={ hasErrorsInput("saleCapacity") }
                    errorMessage={ getMessageErrorInput("saleCapacity") }
                    placeholder={ "E.g. 1.800" }
                    required />
                  <div className='dFlex'>
                    <div className="f1">
                      <Select
                        register={ register }
                        label={ "Minimum order" }
                        hasError={ hasErrorsInput("minimumOrder") }
                        errorMessage={ getMessageErrorInput("minimumOrder") }
                        required
                        name={ assignInputName("minimumOrder") }
                        placeholder={ "Select option" }
                        options={ minimumOrders } />
                    </div>
                    <div className="horizontalSpaceS"></div>
                    <div className="f1">
                      <InputText
                        register={ register }
                        name={ assignInputName("pricePerKg") }
                        label={ "Expected price per kg (USD)" }
                        type={ "number" }
                        hasError={ hasErrorsInput("pricePerKg") }
                        errorMessage={ getMessageErrorInput("pricePerKg") }
                        placeholder={ "E.g. 1.800" }
                        required />
                    </div>
                  </div>
                  <div className='dFlex'>
                    <div className="f1">
                      <label className="productLabel"><span className="required">* </span>Choose your preferred INCOTERMS</label>
                    </div>
                  </div>
                  <div className="gridAuto">
                    { incoterms.map(incoterm => {
                      return (
                        <Checkbox
                          control={ control }
                          label={ incoterm.label }
                          name={ incoterm.value }
                          value={ incoterm.value }
                          key={ incoterm.value }
                          onChange={ onChangeIncotermCheckbox } />
                      );
                    }) }
                  </div>
                  <div className="verticalSpaceL" />
                  <div className='dFlex'>
                    <Toggle
                      control={ control }
                      name={ "assistanceNeeded" }
                      label={ "Need assistance with logistics?" }
                      checked={ assistanceNeeded }
                      onChange={ OnChangeAssistanceNeeded } />
                  </div>
                  <InputTextarea
                    register={ register }
                    name={ assignInputName("additionalDescription") }
                    label={ "Additional description (opt)" }
                    hasError={ hasErrorsInput("additionalDescription") }
                    errorMessage={ getMessageErrorInput("additionalDescription") }
                    placeholder={ "Write description" }
                    rows={ 1 } />
                </section>
              ) }
              { activeTabIndex === 1 && (
                <section className={ `panel__${ activeTabIndex === 1 ? "active" : "inactive" }` }>
                  <div className="verticalSpaceL" />
                  <h1>Sustainability certifications</h1>
                  { certifications.map((certification: string) => {
                    if (!noCertificatesSelected) {
                      return (
                        <>
                          <div className="verticalSpaceL" />
                          <InputFile
                            required
                            label={ sustainabilityCertificationsItems.find(certificationItem => certificationItem?.value === certification)?.label }
                            name={ certification }
                            key={ certification }
                            placeholder={ "Add document" }
                            onChangeFile={ onChangeCertificationFile(certification) }
                          />
                        </>
                      );
                    }
                    return null;
                  }) }
                </section>
              ) }
            </div>
          </form>
          <div className="verticalSpaceL" />
          <div className="dFlex">
            <div className="f1">
              <Button visibleType={ EBtnVisibleType.clear } large={ ELarge.full } type="button" onClick={ () => handleTabSwitch(-1) }>{ activeTabIndex === 0 ? 'Cancel' : 'Back' }</Button>
            </div>
            <div className="horizontalSpaceS"></div>
            <div className="f1">
              <Button visibleType={ EBtnVisibleType.solid } large={ ELarge.full } type="button" onClick={ () => handleTabSwitch(1) }>{ activeTabIndex === 0 ? 'Next' : 'Save' }</Button>
            </div>
          </div>
          {/* Modal Cancellation */ }
          <Modal title="" continueText='Leave' width='560px' closed={ !showCancellationModal } showCloseIcon={ false } onClose={ () => setShowCancellationModal(false) } onContinue={ () => alert("Undo") }>
            <div className="verticalSpaceS"></div>
            <h3 className='textPrimary300 textModalTitle'>You are sure you want to leave ?</h3>
            <div className="verticalSpaceL"></div>
            <p className='textModalDesc'>The changes will not be saved and you will have to create the product from scratch.</p>
          </Modal>
          {/* Modal Confirmation */ }
          <Modal title="" continueText='Continue' width='560px' closed={ !showConfirmationModal } showCloseIcon={ false } onClose={ () => setShowConfirmationModal(false) } onContinue={ handleSubmit(submitForm, () => setActiveTabIndex(0)) }>
            <div className="verticalSpaceS"></div>
            <h3 className='textPrimary300 textModalTitle'>Do you want to continue ?</h3>
            <div className="verticalSpaceL"></div>
            <p className='textModalDesc'>Are yo sure to create your product? Once submitted you will not be able to modify them until they have been reviewed by our <b>Bazar</b> team.</p>
          </Modal>
          {/* Modal Confirmation no Certificates */ }
          <Modal title="" continueText='Continue' width='560px' closed={ !showConfirmationNoCertModal } showCloseIcon={ false } onClose={ () => setShowConfirmationNoCertModal(false) } onContinue={ handleSubmit(submitForm, () => setActiveTabIndex(0)) }>
            <div className="verticalSpaceS"></div>
            <h3 className='textPrimary300 textModalTitle'>Do you want to continue ?</h3>
            <div className="verticalSpaceL"></div>
            <p className='textModalDesc'>Are you sure the information is complete? If you don't have a sustainability certificate, don't worry, your products will be published without a sustainability seal.</p>
          </Modal>
          {/* Modal Contratulations */ }
          <Modal title="" continueText='Continue' width='560px' closed={ !showCongratulationsModal } cancelHidden={ true } showCloseIcon={ false } onClose={ () => { } } onContinue={ onCreateProduct }>
            <div className="verticalSpaceS"></div>
            <h3 className='textPrimary300 textModalTitle'><AiFillCheckCircle className='textSuccess200' /> Congratulations</h3>
            <div className="verticalSpaceL"></div>
            <p className='textModalDesc'>
              Once the documents are reviewed and approved you will be notified and the buyers will see the score in their accounts after our review we will assign you a level of Sustainability.
            </p>
            <div className="verticalSpaceS"></div>
            <ul>
              <li>
                <p className='textModalDesc'><b>Level 1:</b>More than 1 sustainability practices (SP) seals.</p>
              </li>
              <li>
                <p className='textModalDesc'><b>Level 2:</b>Agriculture Guild Member with SP seals.</p>
              </li>
              <li>
                <p className='textModalDesc'><b>Level 3:</b>Carbon credits provider.</p>
              </li>
            </ul>
          </Modal>
          {/* Modal Congratulations no Certificates */ }
          <Modal title="" continueText='Continue' width='560px' closed={ !showCongratulationsNoCertModal } cancelHidden={ true } showCloseIcon={ false } onClose={ () => { } } onContinue={ onCreateProduct }>
            <div className="verticalSpaceS"></div>
            <h3 className='textPrimary300 textModalTitle'><AiFillCheckCircle className='textSuccess200' /> Congratulations</h3>
            <div className="verticalSpaceL"></div>
            <p className='textModalDesc'>
              You have successfully created your product!<br />
              Remember that to improve the quality of your product and visibility in <b>Bazar</b> and have your profile verified by our team we invite you to get your sustainability certificates.
            </p>
          </Modal>
        </div >
      </div >
    </div >
  );
};

export default ProductCreation;
