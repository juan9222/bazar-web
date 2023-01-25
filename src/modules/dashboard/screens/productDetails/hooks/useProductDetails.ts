import { yupResolver } from "@hookform/resolvers/yup";
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

  const { getProductDetails, patchProductAvailability } = useProductDetailsProviders();

  const location = useLocation();
  const productId = location.pathname.split('/').pop();

  const methods = useForm<IProductDetailProps>({
    resolver: yupResolver(productDetailFormValidator),
    mode: "all",
  });
  const { register, handleSubmit, formState: { errors: detailProductErrors } } = methods;

  const onChangeEditAvailabilityDisplay = () => setShowEditAvailability(!showEditAvailability);

  const onGetProductDetails = async () => {
    const resp = await getProductDetails(productId ?? '');
    setProduct(resp.data);
  };

  const hasErrorsInput = (inputName: TProductDetailFormKeys): boolean => {
    return detailProductErrors[inputName] !== undefined;
  };

  const getMessageErrorInput = (inputName: TProductDetailFormKeys): string => {
    return detailProductErrors[inputName]?.message || "This input is mandatory";
  };

  const submitForm = async (data: IProductDetailProps) => {
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

  useEffect(() => {
    onGetProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    register,
    handleSubmit,
    submitForm,
    hasEditError,
    hasErrorsInput,
    getMessageErrorInput,
    savingAvailability,
    product,
    showEditAvailability,
    onChangeEditAvailabilityDisplay,
  };
};

export default useProductDetails;