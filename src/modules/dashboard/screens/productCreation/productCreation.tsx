import Button from "../../../common/components/button/button";
import { EBtnVisibleType } from "../../../common/components/button/interfaces";
import Checkbox from "../../../common/components/checkbox/checkbox";
import InputFile from "../../../common/components/inputFile";
import InputText from "../../../common/components/inputText/inputText";
import InputTextarea from "../../../common/components/inputTextarea";
import Select from "../../../common/components/select";
import TabGroup from "../../../common/components/tab";
import Toggle from "../../../common/components/toggle";
import { ELarge } from "../../../common/interfaces";
import useCreateProduct from "./hooks/useProductCreation";

const ProductCreation: React.FC<any> = (props) => {
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
    products,
    productTypes,
    varieties,
    sustainabilityCertificationsItems,
    incoterms,
    minimumOrders,
    certifications,
    onChangeCertificationCheckbox,
    onChangeIncotermCheckbox,
    assistanceNeeded,
    OnChangeAssistanceNeeded,
    productPictures,
    displayPicture,
    setProductPictures,
    onChangeCertificationFile,
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
                  { displayPicture && <img src={ displayPicture } /> }
                  <InputFile
                    label={ "Select your product photos." }
                    name={ assignInputName("productPictures") }
                    placeholder={ "Select your product photos" }
                    accept={ ".jpg, .png, .jpeg" }
                    onChangeFile={ setProductPictures }
                    footer="This form accepts JPEG, JPG, PNG files up to 10 MB."
                    required
                  />
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
                    { sustainabilityCertificationsItems.map(certification => {
                      return (
                        <Checkbox
                          control={ control }
                          label={ certification.label }
                          value={ certification.value }
                          key={ certification.value }
                          checked={ certifications.indexOf(certification.value) >= 0 }
                          name={ assignInputName("sustainabilityCertifications") }
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
                    return (
                      <>
                        <div className="verticalSpaceL" />
                        <InputFile
                          required
                          label={ sustainabilityCertificationsItems[certifications.indexOf(certification)].label }
                          name={ certification }
                          key={ certification }
                          placeholder={ "Add document" }
                          onChangeFile={ onChangeCertificationFile(certification) }
                        />
                      </>
                    );
                  }) }
                </section>
              ) }
            </div>
            <div className="verticalSpaceL" />
            <div className="dFlex">
              <div className="f1">
                <Button visibleType={ EBtnVisibleType.clear } large={ ELarge.full } type="button" onClick={ () => handleTabSwitch(activeTabIndex) }>{ activeTabIndex === 0 ? 'Cancel' : 'Back' }</Button>
              </div>
              <div className="horizontalSpaceS"></div>
              <div className="f1">
                { activeTabIndex === 0 && (
                  <Button visibleType={ EBtnVisibleType.solid } large={ ELarge.full } type={ 'button' } onClick={ () => handleTabSwitch(activeTabIndex) }>Next</Button>
                ) }
                { activeTabIndex === 1 && (
                  <Button visibleType={ EBtnVisibleType.solid } large={ ELarge.full } type={ 'button' } onClick={ handleSubmit(submitForm, (errors, e) => console.log(errors, e)) }>Create</Button>
                ) }
              </div>
            </div>
          </form>
        </div >
      </div >
    </div >
  );
};

export default ProductCreation;

