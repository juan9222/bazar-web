import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { IProductDetailProps, TProductDetailFormKeys } from "../interfaces";
import useProductDetailsProviders from "../providers";
import { productDetailFormValidator } from "../validators";

const useProductDetails = () => {
  const [product, setProduct] = useState<any>();
  const [showEditAvailability, setShowEditAvailability] = useState<boolean>(false);
  const [hasEditError, setHasEditError] = useState(false);
  const [savingAvailability, setSavingAvailability] = useState<boolean>(false);
  const [incotermOptions, setIncotermOptions] = useState<Array<{ label: string, value: string; }>>();

  const { getProductDetails, patchProductAvailability } = useProductDetailsProviders();

  const location = useLocation();
  const productId = location.pathname.split('/').pop();

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

  const onPublish = async (event: React.MouseEvent, productId: string) => {
    event.stopPropagation();
    try {
      const resp = await axios.patch(`${ process.env.REACT_APP_BAZAR_URL }/products/update-publish/${ productId }`);
      const newProduct = { ...product, status: resp.data.status };
      setProduct(newProduct);
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
  };
};

export default useProductDetails;