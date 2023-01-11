import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useProductCreationProviders from "../providers";
import { IProductCreationProps, TProductCreationFormKeys } from "../interfaces";
import { productCreationFormValidator } from "../validators";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useProductListProviders from "../../productList/providers";
import { getOptionIconLabel } from "../../../../common/components/productIcon";
import React from "react";

const useCreateProduct = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [showCancellationModal, setShowCancellationModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [showConfirmationNoCertModal, setShowConfirmationNoCertModal] = useState<boolean>(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [showCongratulationsNoCertModal, setShowCongratulationsNoCertModal] = useState(false);
  const [products, setProducts] = useState<Array<{ label: JSX.Element | string; value: string; }>>([]);
  const [productTypes, setProductTypes] = useState<Array<{ label: JSX.Element | string; value: string; }>>([]);
  const [varieties, setVarieties] = useState<Array<{ label: JSX.Element | string; value: string; }>>([]);
  const [sustainabilityCertificationsItems, setsustainabilityCertificationsItems] = useState<Array<{ label: string; value: string; }>>([]);
  const [incotermsItems, setIncotermsItems] = useState<Array<{ label: string; value: string; }>>([]);
  const [minimumOrders, setMinimumOrders] = useState<Array<{ label: JSX.Element | string; value: string; }>>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>();
  const [selectedProductType, setSelectedProductType] = useState<string>();
  const [selectedVariety, setSelectedVariety] = useState<string>();
  const [selectedMinimumOrder, setSelectedMinimumOrder] = useState<string>();
  const [displayPictures, setDisplayPictures] = useState<Array<string>>([]);
  const [assistanceNeeded, setAssistanceNeeded] = useState<boolean>(false);
  const [productPictures, setProductPictures] = useState<any>([]);
  const [certifications, setCertifications] = useState<any>([]);
  const [noCertificatesSelected, setNoCertificatesSelected] = useState<boolean>(false);
  const [incoterms, setIncoterms] = useState<Array<string>>([]);
  const [certificationsFiles, setCertificationsFiles] = useState<any>([]);
  const [hasError, setHasError] = useState(false);
  const [productPicturesError, setProductPicturesError] = useState<boolean>(false);
  const [productError, setProductError] = useState<boolean>(false);
  const [productTypeError, setProductTypeError] = useState<boolean>(false);
  const [varietyError, setVarietyError] = useState<boolean>(false);
  const [minimumOrderError, setMinimumOrderError] = useState<boolean>(false);

  const navigate = useNavigate();

  //Providers
  const { getBasicProducts } = useProductListProviders();
  const { getProductTypesByProduct, getVarietiesByProduct, getSustainabilityCertificationsItems, getMinimumOrders, getIncoterms } = useProductCreationProviders();

  // Form
  const methods = useForm<IProductCreationProps>({
    resolver: yupResolver(productCreationFormValidator),
    mode: "all",
  });
  const { control, register, handleSubmit, formState: { errors: createProductErrors } } = methods;

  const assignInputName = (inputName: TProductCreationFormKeys): string => {
    return inputName.toString();
  };

  const hasErrorsInput = (inputName: TProductCreationFormKeys): boolean => {
    return createProductErrors[inputName] !== undefined;
  };

  const getMessageErrorInput = (inputName: TProductCreationFormKeys): string => {
    return createProductErrors[inputName]?.message || "This input is mandatory";
  };

  const submitForm = async (data: IProductCreationProps) => {
    setHasError(false);
    if (certifications.length !== Object.keys(certificationsFiles).length) {
      setHasError(false);
      alert("Uploaded certification files doesn't match # of selected certifications.");
    } else if (!selectedProduct) {
      setProductError(true);
      setActiveTabIndex(0);
      hideModals();
    } else if (!selectedProductType) {
      setProductTypeError(true);
      setActiveTabIndex(0);
      hideModals();
    } else if (!selectedVariety) {
      setVarietyError(true);
      setActiveTabIndex(0);
      hideModals();
    } else if (!selectedMinimumOrder) {
      setMinimumOrderError(true);
      setActiveTabIndex(0);
      hideModals();
    } else if (productPictures.length === 0) {
      setProductPicturesError(true);
      setActiveTabIndex(0);
      hideModals();
    } else {
      data.uuid = localStorage.getItem("uuid") || "";
      data.product = selectedProduct;
      data.productType = selectedProductType;
      data.varieties = selectedVariety;
      data.minimumOrder = selectedMinimumOrder;
      data.sustainabilityCertifications = certifications;
      data.incoterms = incoterms;
      data.assistanceNeeded = assistanceNeeded;
      try {
        let formData = new FormData();
        const body = {
          basic_product_uuid: data.product,
          product_type_uuid: data.productType,
          variety_uuid: data.varieties,
          capacity_per_year: data.saleCapacity,
          date_in_port: data.dateInPort?.toLocaleDateString('sv'),
          guild_or_association: data.companyAssociation,
          available_for_sale: data.saleCapacity,
          minimum_order_uuid: data.minimumOrder,
          expected_price_per_kg: data.pricePerKg,
          incoterms_uuid: data.incoterms,
          assistance_logistic: data.assistanceNeeded,
          additional_description: data.additionalDescription,
          uuid_user: data.uuid,
          sustainability_certifications_uuid: data.sustainabilityCertifications,
        };
        if (certifications.length < 1) {
          delete body.sustainability_certifications_uuid;
        }
        formData.append("body", JSON.stringify(body));
        Object.values(certificationsFiles).forEach((file: any) => {
          formData.append("files[]", file);
        });
        if (productPictures) {
          Array.from(productPictures).forEach((file: any) => {
            formData.append("images[]", file);
          });
        }
        await axios.post(`${ process.env.REACT_APP_BAZAR_URL }/products`, formData, {});

        if (showConfirmationModal) {
          setShowConfirmationModal(false);
          setShowCongratulationsModal(true);
        } else if (showConfirmationNoCertModal) {
          setShowConfirmationNoCertModal(false);
          setShowCongratulationsNoCertModal(true);
        }
      } catch (error) {
        console.warn(error);
        setHasError(true);
      }
    }
  };

  const hideModals = () => {
    setActiveTabIndex(0);
    setShowConfirmationModal(false);
    setShowConfirmationNoCertModal(false);
  };

  const handleTabSwitch = (index: number) => {
    const nextTab = activeTabIndex + index;
    if (nextTab < 0) {
      setShowCancellationModal(true);
    } else if (nextTab > 1) {
      if (Object.keys(certificationsFiles).length > 0) {
        setShowConfirmationModal(true);
      } else {
        setShowConfirmationNoCertModal(true);
      }
    } else {
      setActiveTabIndex(nextTab);
    }
  };

  const onGetProducts = async () => {
    const resp = await getBasicProducts();
    const productList = resp.data.results.map((product: any) => ({
      label: getOptionIconLabel('product', product.basic_product),
      value: product.uuid,
    }));
    setProducts(productList);
  };

  const onGetProductTypes = async () => {
    const resp = await getProductTypesByProduct(selectedProduct!);
    const productTypeList = resp.data.results.map((productType: any) => ({
      label: productType.product_type,
      value: productType.uuid,
    }));
    setProductTypes(productTypeList);
  };

  const onGetVarieties = async () => {
    const resp = await getVarietiesByProduct(selectedProduct!);
    const varietiesList = resp.data.results.map((variety: any) => ({
      label: variety.variety,
      value: variety.uuid,
    }));
    setVarieties(varietiesList);
  };

  const onGetsustainabilityCertificationsItems = async () => {
    const resp = await getSustainabilityCertificationsItems();
    const certificationsList = resp.data.results.map((certification: any) => ({
      label: certification.certification,
      value: certification.uuid,
    }));
    setsustainabilityCertificationsItems(certificationsList);
  };

  const onGetIncotermsItems = async () => {
    const resp = await getIncoterms();
    const incotermsList = resp.data.results.map((incoterm: any) => ({
      label: incoterm.incoterm,
      value: incoterm.uuid,
    }));
    setIncotermsItems(incotermsList);
  };

  const onGetMinimumOrders = async () => {
    const resp = await getMinimumOrders();
    const minimumOrderList = resp.data.results.map((minimumOrder: any) => ({
      label: getOptionIconLabel('minimumOrder', minimumOrder.minimum_order),
      value: minimumOrder.uuid,
    }));
    setMinimumOrders(minimumOrderList);
  };

  const onChangeProductPictures = (fileObj: any) => {
    if (productPicturesError) {
      setProductPicturesError(false);
    }
    const newProductPictures = [...productPictures];
    Array.from(fileObj).forEach(file => {
      newProductPictures.push(file);
    });
    if (newProductPictures.length > 5) {
      newProductPictures.length = 5;
    }
    setProductPictures(newProductPictures);
  };

  const onRemoveProductPicture = (index: number) => {
    const newProductPictures = [...productPictures];
    newProductPictures.splice(index, 1);
    setProductPictures(newProductPictures);
  };

  const onChangeProduct = (option: unknown) => {
    setProductError(false);
    setSelectedProduct((option as any).value);
  };

  const onChangeProductType = (option: unknown) => {
    setProductTypeError(false);
    setSelectedProductType((option as any).value);
  };

  const onChangeVariety = (option: unknown) => {
    setVarietyError(false);
    setSelectedVariety((option as any).value);
  };

  const onChangeMinimumOrder = (option: unknown) => {
    setMinimumOrderError(false);
    setSelectedMinimumOrder((option as any).value);
  };

  const onChangeCertificationCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (sustainabilityCertificationsItems.find(certificationItem => certificationItem?.value === value)?.label !== "No certificate") {
      const newCertifications = [...certifications];
      const index = newCertifications.indexOf(value);
      if (index === -1) {
        newCertifications.push(value);
      } else {
        newCertifications.splice(index, 1);
      }
      setCertifications(newCertifications);
      setNoCertificatesSelected(false);
    }
    else {
      setCertifications([]);
      setNoCertificatesSelected(true);
    }
  };

  const onChangeIncotermCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newIncoterms = [...incoterms];
    const index = newIncoterms.indexOf(value);
    if (index === -1) {
      newIncoterms.push(value);
    } else {
      newIncoterms.splice(index, 1);
    }
    setIncoterms(newIncoterms);
  };

  const OnChangeAssistanceNeeded = () => {
    setAssistanceNeeded(!assistanceNeeded);
  };

  const onChangeCertificationFile = (certification: string) => (fileObj: any) => {
    const newCertificationsFiles = { ...certificationsFiles };
    newCertificationsFiles[certification] = fileObj;
    setCertificationsFiles(newCertificationsFiles);
  };

  const onCreateProduct = () => {
    setShowCongratulationsModal(false);
    setShowCongratulationsNoCertModal(false);
    navigate("/dashboard/home");
  };

  useEffect(() => {
    onGetProducts();
    onGetsustainabilityCertificationsItems();
    onGetIncotermsItems();
    onGetMinimumOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    selectedProduct !== (null || undefined) && onGetProductTypes();
    selectedProduct !== (null || undefined) && onGetVarieties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);

  useEffect(() => {
    if (productPictures.length > 0)
      setDisplayPictures(productPictures.map((picture: any) => URL.createObjectURL(picture)));
    else setDisplayPictures([]);
  }, [productPictures]);

  return {
    methods,
    control,
    register,
    handleSubmit,
    submitForm,
    hideModals,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    hasError,
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
    setShowCongratulationsModal,
    showCongratulationsNoCertModal,
    setShowCongratulationsNoCertModal,
    products,
    selectedProduct,
    productError,
    productTypes,
    selectedProductType,
    productTypeError,
    varieties,
    selectedVariety,
    varietyError,
    sustainabilityCertificationsItems,
    incoterms: incotermsItems,
    minimumOrders,
    selectedMinimumOrder,
    minimumOrderError,
    certifications,
    noCertificatesSelected,
    assistanceNeeded,
    OnChangeAssistanceNeeded,
    productPictures,
    productPicturesError,
    displayPictures,
    onChangeProductPictures,
    onRemoveProductPicture,
    onChangeProduct,
    onChangeProductType,
    onChangeVariety,
    onChangeMinimumOrder,
    onChangeCertificationCheckbox,
    onChangeIncotermCheckbox,
    onChangeCertificationFile,
    onCreateProduct,
  };
};

export default useCreateProduct;