import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useBazarWalletProviders from "../../../../lisk_api/providers";
import getBinanceBazarContract from "../../../../wallet/helper/getBinanceBazarContract";
import { useUser } from "../../../layouts/dashboardLayout/utils";
import { IProductDetailProps, TProductDetailFormKeys } from "../interfaces";
import useProductDetailsProviders from "../providers";
import { productDetailFormValidator } from "../validators";
import { ethers } from "ethers";
import { BAZAR_NETWORK_BLOCKCHAIN_NAME, BINANCE_SMART_CHAIN_NAME } from "../../../../wallet/helper/constantHelper";
import uuid from "react-uuid";
import { formatDate } from "../utils";
import usePriceFeedBSC from "../../../../payment/hooks/usePriceFeedBSC";
import { SERVICE_FEE } from "../utils";
import { RegisterBuyerOrderType } from "../../../../lisk_api/types/registerBuyerOrderType";
import newBuyerOrderAsset from "../../../../lisk_api/transaction/buyer/newBuyerOrderAsset";

const useProductDetails = () => {
  const [product, setProduct] = useState<any>();
  const [showEditAvailability, setShowEditAvailability] = useState<boolean>(false);
  const [hasEditError, setHasEditError] = useState(false);
  const [savingAvailability, setSavingAvailability] = useState<boolean>(false);
  const [incotermOptions, setIncotermOptions] = useState<Array<{ label: string, value: string; }>>();
  const [showConnectWalletDialog, setShowConnectWalletDialog] = useState<boolean>(false);
  const [showPublishDialog, setShowPublishDialog] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showConfirmBlockModal, setShowConfirmBlockModal] = useState<boolean>(false);
  const [showTransactionInProgressModal, setShowTransactionInProgressModal] = useState<boolean>(false);
  const [bnbValue, setBnbValue] = useState<number>();
  const [showConnectWalletDialogBuyer, setShowConnectWalletDialogBuyer] = useState<boolean>(false);
  const { fetchBnb } = usePriceFeedBSC();
  const { getProductDetails, patchProductAvailability, deleteProduct } = useProductDetailsProviders();
  const [selectedIncoterm, setSelectedIncoterm] = useState<any>();

  const location = useLocation();
  const productId = location.pathname.split('/').pop();

  const { binanceAccount } = useUser();

  const { getWalletByUser, createPaymentProvider, getPaymentProviderByProductId } = useBazarWalletProviders();

  const onChangeIncoterm = (option: unknown) => {
    setSelectedIncoterm((option as any).value);
  };

  const methods = useForm<IProductDetailProps>({
    resolver: yupResolver(productDetailFormValidator(product?.available_for_sale)),
    mode: "all",
  });
  const { register, handleSubmit, formState: { errors: detailProductErrors }, watch } = methods;

  const navigate = useNavigate();

  const quantityToBuy = watch("quantity");

  const onChangeEditAvailabilityDisplay = () => setShowEditAvailability(!showEditAvailability);

  const onGetProductDetails = async () => {
    const resp = await getProductDetails(productId ?? '');
    const newIncotermOptions: Array<{ label: string, value: string; }> = [];
    resp.data.incoterms.map((incoterm: { uuid: string, incoterm: string; }) => {
      const inco = incoterm.incoterm.match(/\((.*?)\)/);
      if (inco !== null) {
        newIncotermOptions.push({
          label: inco[1],
          value: incoterm.uuid,
        });
      }
    });
    setIncotermOptions(newIncotermOptions);
    setProduct(resp.data);
  };

  const hasErrorsInput = (inputName: TProductDetailFormKeys): boolean => {
    return detailProductErrors[inputName] !== undefined;
  };

  const getMessageErrorInput = (inputName: TProductDetailFormKeys): string => {
    return detailProductErrors[inputName]?.message || "This input is mandatory";
  };

  const submitAvailableAssets = async (data: IProductDetailProps) => {
    setHasEditError(false);
    setSavingAvailability(true);
    try {
      const resp = await patchProductAvailability(productId!, data.availability!);
      const newProduct = { ...product };
      newProduct.available_for_sale = resp?.data?.available_for_sale;
      setProduct(newProduct);
      onChangeEditAvailabilityDisplay();
      setSavingAvailability(false);
    } catch (error) {
      alert('There has been an error, try again.');
      setSavingAvailability(false);
    }
  };

  const onPublish = () => {
    setShowPublishDialog(true);
  };

  const publishProduct = async () => {
    if (!binanceAccount) {
      setShowConnectWalletDialog(true);
      setShowPublishDialog(false);
      return;
    }
    try {
      setShowPublishDialog(false);
      const bazarContract = getBinanceBazarContract(binanceAccount);
      const minQuantityToSell = 1;
      const sellerTradingFee = 2;
      try {
        const requestBody = {
          "userUUID": localStorage.getItem("uuid") || "",
          "blockchainName": BAZAR_NETWORK_BLOCKCHAIN_NAME.toString()
        };

        const resultGetWalletData = await getWalletByUser(requestBody);
        if (resultGetWalletData?.data?.data) {
          const productNumberCode = Math.floor((Math.random() * (99999 - 10000) + 10000));
          const resulBinanceTx = await bazarContract.createSaleOrder(
            productNumberCode,
            minQuantityToSell,
            product.available_for_sale,
            product.expected_price_per_kg,
            sellerTradingFee
          );
          const receiptTx = await resulBinanceTx.wait(1);
          console.log("Binance Transaction:", receiptTx);
          if (receiptTx.status === 1) {
            const orderId = uuid();

            const resp = await axios.patch(`${ process.env.REACT_APP_BAZAR_URL }/products/update-publish/${ product.uuid }`);
            setProduct({
              ...product,
              status: resp.data.status
            });


            const requestPaymentProviderBody = {
              "accountProvider": binanceAccount,
              "description": BINANCE_SMART_CHAIN_NAME,
              "userUUID": localStorage.getItem("uuid") || "",
              "productUUID": product.uuid.toString(),
              "productReference": productNumberCode.toString(),
              "orderId": orderId
            };

            createPaymentProvider(requestPaymentProviderBody);


          } else {
            console.log('Binance Transactions is rejected.');
            alert('Binance Transactions is rejected. Try again.');
          }
        } else {
          console.log('Something went wrong getting credentials.' + resultGetWalletData.data.errorMessage);
          alert('Something went wrong getting credentials. Try again.');
        }
      } catch (error) {
        console.log('Something went wrong accepting the BSC contract.' + error);
        alert('Something went wrong accepting the BSC contract. Try again.');
      }
    } catch (error) {
      console.log('Something went wrong. Try again.' + error);
      alert('Something went wrong. Try again.');
    }


  };

  const onConfirmBuy = async () => {
    if (!binanceAccount) {
      setShowConnectWalletDialog(true);
      setShowConfirmModal(false);
      return;
    }
    try {
      const resultGetPaymentProvider = await getPaymentProviderByProductId(productId ?? '');

      if (resultGetPaymentProvider?.data?.data) {

        const bazarContract = getBinanceBazarContract(binanceAccount);
        console.log("Record" + bnbValue);

        const options = { value: ethers.utils.parseEther(bnbValue?.toFixed(4).toString() ?? '') };
        setShowConfirmBlockModal(true);
        setShowConfirmModal(false);

        const productReference: number = resultGetPaymentProvider?.data?.data.productReference;

        const resultBinanceTx = await bazarContract.buyProductUsingBNB(
          resultGetPaymentProvider?.data?.data.accountProvider,
          productReference,
          quantityToBuy,
          options
        );
        setShowConfirmBlockModal(false);
        setShowTransactionInProgressModal(true);
        const receiptTx = await resultBinanceTx.wait(1);
        console.log("Binance Transaction:", receiptTx);

        const date = new Date();

        const summaryState = {
          status: receiptTx.status,
          orderCode: receiptTx.transactionHash,
          totalBnb: bnbValue!,
          valueXKg: product?.expected_price_per_kg,
          amount: quantityToBuy,
          sellerUUID: product?.uuid_seller,
          date: formatDate(date, 'dd MMM, yyyy'),
        };

        if (receiptTx.status === 1) {
          await patchProductAvailability(productId!, product?.available_for_sale - quantityToBuy!);

          const subTotal: number = ((quantityToBuy!) * (product?.expected_price_per_kg));
          const fee: number = subTotal * SERVICE_FEE;
          const total: number = subTotal + fee;

          try {
            const body = {
              uuid_product: product?.uuid,
              amount: `${ quantityToBuy } kg`,
              value_x_kg: `${ product?.expected_price_per_kg } USD/kg`,
              total_pay_bnb: `${ bnbValue } BNB`,
              total_pay_usd: `${ total } USD`,
              payment_method: 'Wallet',
              order_code: receiptTx.transactionHash,
              date: formatDate(date, 'dd MMM, yyyy'),
              exchange_rate: `1 BNB : ${ (product?.expected_price_per_kg * quantityToBuy!) * (1 + SERVICE_FEE) / bnbValue! } USD`,
              service_fee: `${ fee } USD`,
              uuid_buyer: localStorage.getItem("uuid") || "",
            };
            await axios.post(`${ process.env.REACT_APP_BAZAR_URL }/products/order/buyer-email`, body, {});

            const sellerBody = {
              uuid_product: product?.uuid,
              amount: `${ quantityToBuy } kg`,
              value_x_kg: `${ product?.expected_price_per_kg } USD/kg`,
              total_pay_bnb: `${ bnbValue } BNB`,
              total_pay_usd: `${ total } USD`,
              uuid_buyer: localStorage.getItem("uuid") || "",
              uuid_incoterm: selectedIncoterm,
              date: formatDate(date, 'dd MMM, yyyy'),
            };
            await axios.post(`${ process.env.REACT_APP_BAZAR_URL }/products/order/seller-email`, sellerBody, {});
          } catch (error) {
            console.log(error);
          } finally {
            const requestBody = {
              "userUUID": localStorage.getItem("uuid") || "",
              "blockchainName": BAZAR_NETWORK_BLOCKCHAIN_NAME.toString()
            };
            const resultGetWalletData = await getWalletByUser(requestBody);

            console.log("exchangeRate", receiptTx.transactionHash);

            if (resultGetWalletData.data.data) {
              const orderId = uuid();
              const token = ' BNB';
              const buyOrderAsset: RegisterBuyerOrderType = {
                buyerOrderId: orderId,
                sellerOrderId: resultGetPaymentProvider?.data.data.orderId,
                status: receiptTx.status === 1 ? "Accepted" : "Rejected",
                token: token,
                exchangeRate: `1 BNB : ${ (product?.expected_price_per_kg * quantityToBuy!) * (1 + SERVICE_FEE) / bnbValue! } USD`,
                valueXKg: product?.expected_price_per_kg.toString(),
                quantity: quantityToBuy ?? 0,
                serviceFee: fee.toString(),
                totalPayToken: `${ bnbValue } BNB`,
                totalPayInUSD: total + ' USD',
                transacctionPayment: receiptTx.transactionHash,
                accountSeller: resultGetPaymentProvider?.data?.data.accountProvider,
                accountBuyer: binanceAccount.toString(),
                productId: resultGetPaymentProvider?.data?.data.productReference
              };

              await newBuyerOrderAsset(buyOrderAsset, resultGetWalletData.data.data.passphrases.toString());
            }
          }

        } else {
          console.log('Binance Transactions is rejected.');
        }
        navigate('../payment-summary/1', { state: summaryState });
      }
    } catch (error: any) {
      if (error.error === 'Rejected by user') {
        setShowConfirmModal(false);
        setShowConfirmBlockModal(false);
      } else {
        console.log('Something went wrong. Try again.' + error);
        alert('Something went wrong. Try again. ' + error.code);
      }
    } finally {
      setShowConfirmBlockModal(false);
    }
  };

  const onHide = async () => {
    try {
      const resp = await axios.patch(`${ process.env.REACT_APP_BAZAR_URL }/products/update-hidden/${ product.uuid }`);
      setProduct({ ...product, status: resp.data.status });
    } catch (error) {
      alert('Something went wrong. Try again.');
    }
  };

  useEffect(() => {
    onGetProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBuyProduct = () => {
    if (!binanceAccount) {
      setShowConnectWalletDialogBuyer(true);
      return;
    }
    setShowConfirmModal(true);
  };

  const onDeleteProduct = async () => {
    try {
      if (productId) {
        const resp = await deleteProduct(productId);
        navigate(`../product-list/`, { replace: true, state: { previousUrl: location.pathname } });
      }
    } catch (error) {
      console.error(error);
      alert('There has been an error, try again.');
      navigate(`../product-list/`, { replace: true, state: { previousUrl: location.pathname } });
    }
  };

  return {
    incotermOptions,
    register,
    handleSubmit,
    submitAvailableAssets,
    hasEditError,
    hasErrorsInput,
    getMessageErrorInput,
    savingAvailability,
    product,
    showEditAvailability,
    onChangeEditAvailabilityDisplay,
    quantityToBuy,
    onPublish,
    onHide,
    showConnectWalletDialog,
    setShowConnectWalletDialog,
    showPublishDialog,
    setShowPublishDialog,
    publishProduct,
    showConfirmModal,
    setShowConfirmModal,
    showConfirmBlockModal,
    setShowConfirmBlockModal,
    showTransactionInProgressModal,
    setShowTransactionInProgressModal,
    onConfirmBuy,
    setBnbValue,
    onBuyProduct,
    showConnectWalletDialogBuyer,
    setShowConnectWalletDialogBuyer,
    onDeleteProduct,
    onChangeIncoterm,
  };
};

export default useProductDetails;