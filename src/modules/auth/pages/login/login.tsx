import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "../../../common/components/button";
import InputText from "../../../common/components/inputText";
import { ELarge } from "../../../common/interfaces";
// import getTransactionById from "../../../lisk_api/transaction/blockchain/getTransactionById";
import newBuyerOrderAsset from "../../../lisk_api/transaction/buyer/newBuyerOrderAsset";
import getLatestSellOrders from "../../../lisk_api/transaction/seller/getLatestSellOrders";
import getOrderById from "../../../lisk_api/transaction/seller/getOrderById";
import newSellOrderAsset from "../../../lisk_api/transaction/seller/newSellerOrderAsset";
import { RegisterBuyerOrderType } from "../../../lisk_api/types/registerBuyerOrderType";
import { RegisterOrderType } from "../../../lisk_api/types/registerOrderAssetType";

import AuthlayoutContent from "../../layouts/authLayoutContent";
import useLogin from './hooks/useLogin';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    onSubmitForm,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    showPassword,
    handleToggleShowPassword,
    loading,
    haveError,
    defaultEmail,
    errorMessage,
    emailInputValue,
    passwordInputValue,
  } = useLogin();

  /*
    const sell = async () => {
      const sellOrderAsset: RegisterOrderType = {
        productId: '3435',
        productName: 'Coffe',
        productDescription: 'Coffer ABd DAd',
        minQuantityToSell: '450',
        quantity: '4500',
        price: '25',
        files: [],
        transport: []
      };
  
      await newSellOrderAsset(sellOrderAsset, "rifle trust muscle helmet blue cruel denial gift alpha grid also develop");
    };
  */
  /*
    const buy = async () => {
      const buyOrderAsset: RegisterBuyerOrderType = {
        sellerOrderId: 'a80ab8910e856def069d375bc17a80760934af0f605b0d40123c9c5431ae9c4d',
        productName: 'Coffe',
        quantity: 450,
        price: 11250
      };
  
      await newBuyerOrderAsset(buyOrderAsset, "rifle trust muscle helmet blue cruel denial gift alpha grid also develop");
    };*/

  const ppp = async () => {
    const result: string[] = await getLatestSellOrders();
    console.log("list ordenes:", result);

    if (result.length > 0) {
      const details = await getOrderById(result[0]);
      console.log("Details:", details);
    }

    // await getTransactionById("dce0efd23d34112bec82acec9a5021fcac3f9aad11a6570ef4648166669f0659");
  };

  // sell();
  //buy();
  ppp();

  return (
    <AuthlayoutContent title={ "Login" } subtitle={ "Welcome, please enter your credentials." }>
      { haveError && <>
        <p className="textError100 textAlignCenter">{ errorMessage }</p>
        <div className="verticalSpaceM"></div>
      </>
      }
      <form onSubmit={ handleSubmit(onSubmitForm) }>
        <InputText
          defaultValue={ defaultEmail || '' }
          register={ register }
          name={ assignInputName("email") }
          label={ "Email" }
          type={ "email" }
          hasError={ hasErrorsInput("email") }
          errorMessage={ getMessageErrorInput("email") }
          autoCapitalize={ "off" }
          placeholder={ "Enter email" }
          autoComplete={ "off" } />
        <InputText
          register={ register }
          name={ assignInputName("password") }
          label={ "Password" }
          type={ showPassword ? "text" : "password" }
          hasError={ hasErrorsInput("password") }
          errorMessage={ getMessageErrorInput("password") }
          autoCapitalize={ "off" }
          placeholder={ "Enter password" }
          autoComplete={ "off" }
          icon={
            <p className="inputTextIconText">{ showPassword ? "Hide" : "Show" }</p>
          }
          onClickIcon={ handleToggleShowPassword } />
        <p className="textAlignEnd">
          <Link to="/auth/forgot-password" className="textPrimary200 textLink">Forgot password?</Link>
        </p>
        <div className="loginContainer__buttonSubmit">
          <Button disabled={ loading || !emailInputValue || !passwordInputValue } large={ ELarge.full } type="submit">{ loading ? (
            <AiOutlineLoading3Quarters className="loaderIcon" />

          ) : "Login" }</Button>
        </div>
        <div className="loginContainer__dontHaveAccount">
          <p className="defaultText textNeutral200 textAlignCenter">
            Don't have an account? <Link to="/auth/register" className="textPrimary200 textLink">Register</Link>
          </p>
        </div>
        <div className="loginContainer__tAndC">
          <p className="smallText textNeutral200 textAlignCenter">
            By continuing, I confirm that I agree to the
            <a href="/" className="textPrimary200 textLink"> Terms of Use</a> and
            <a href="/" className="textPrimary200 textLink"> Privacy Policy</a>.
          </p>
        </div>
      </form>
    </AuthlayoutContent>
  );
};

export default Login;
