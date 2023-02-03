import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import useBazarWalletProviders from "../../../../lisk_api/providers";
import getBinanceBazarContract from "../../../../wallet/helper/getBinanceBazarContract";
import { useUser } from "../../../layouts/dashboardLayout/utils";
import { IProductDetailProps, TProductDetailFormKeys } from "../interfaces";
import useProductDetailsProviders from "../providers";
import { productDetailFormValidator } from "../validators";
import { ethers } from "ethers";

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
  const [bnbValue, setBnbValue] = useState<number>();

  const { getProductDetails, patchProductAvailability } = useProductDetailsProviders();

  const location = useLocation();
  const productId = location.pathname.split('/').pop();

  const { binanceAccount } = useUser();

  const { getPaymentProviderByProductId } = useBazarWalletProviders();

  const methods = useForm<IProductDetailProps>({
    resolver: yupResolver(productDetailFormValidator(product?.available_for_sale)),
    mode: "all",
  });
  const { register, handleSubmit, formState: { errors: detailProductErrors }, watch } = methods;

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
  };

  const onConfirmBuy = async () => {
    if (!binanceAccount) {
      setShowConfirmBlockModal(!showConfirmBlockModal);
      setShowConfirmModal(!showConfirmModal);
      return;
    }
    try {
      const resultGetPaymentProvider = await getPaymentProviderByProductId(productId ?? '');

      if (resultGetPaymentProvider?.data?.data) {

        const bazarContract = getBinanceBazarContract(binanceAccount);

        const options = { value: ethers.utils.parseEther(bnbValue?.toFixed(4).toString() ?? '') };
        const resultBinanceTx = await bazarContract.buyProductUsingBNB(
          resultGetPaymentProvider?.data?.data.accountProvider,
          resultGetPaymentProvider?.data?.data.productReference,
          quantityToBuy,
          options
        );

        const receiptTx = resultBinanceTx.wait(1);
        console.log("Binance Transaction:", receiptTx);

        if (receiptTx.status === 1) {

          // TODO: Call endpoint to update inventory

        } else {
          console.log('Binance Transactions is rejected.');
          alert('Binance Transactions is rejected. Try again.');
        }
      }
    } catch (error) {
      console.log('Something went wrong. Try again.' + error);
      alert('Something went wrong. Try again.');
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
    onConfirmBuy,
    setBnbValue,
  };
};

export default useProductDetails;