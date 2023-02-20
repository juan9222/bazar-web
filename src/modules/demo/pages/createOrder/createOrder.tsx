import React from "react";
import createOrderBg from "../../../../assets/demo/images/demo-create-order-bg.png";
import InputText from "../../../common/components/inputText";
import useDemoCreateOrder from "./hooks/useDemoCreateOrder";

const CreateOrder: React.FC = () => {
  const { assignInputName, control, handleSubmit, onSubmitForm, hasErrorsInput, getMessageErrorInput } = useDemoCreateOrder();

  return (
    <div className="demo">
      <div className="demo__leftContent">
        <h1 className="demo__leftContent--title">Create Order</h1>
        <hr />
        <br />
        <br />
        <form onSubmit={ handleSubmit(onSubmitForm) }>
          <InputText
            control={ control }
            name={ assignInputName("productId") }
            label={ "Product ID" }
            type={ "text" }
            hasError={ hasErrorsInput("productId") }
            errorMessage={ getMessageErrorInput("productId") }
            autoCapitalize={ "off" }
            placeholder={ "Enter product ID" }
            autoComplete={ "off" }
            required />
        </form>
      </div>
      <div className="demo__rightContent">
        <img className="demo__rightContent--img" src={ createOrderBg } alt="" />
      </div>
    </div>
  );
};

export default CreateOrder;
