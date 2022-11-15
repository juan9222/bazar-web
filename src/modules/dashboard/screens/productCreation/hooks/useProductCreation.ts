import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useProductCreationProviders, { token } from "../providers";
import { IProductCreationProps, TProductCreationFormKeys } from "../interfaces";
import { productCreationFormValidator } from "../validators";
import axios from "axios";

const useCreateProduct = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [products, setProducts] = useState<Array<{ label: string; value: string; }>>([]);
  const [productTypes, setProductTypes] = useState<Array<{ label: string; value: string; }>>([]);
  const [varieties, setVarieties] = useState<Array<{ label: string; value: string; }>>([]);
  const [sustainabilityCertificationsItems, setsustainabilityCertificationsItems] = useState<Array<{ label: string; value: string; }>>([]);
  const [incotermsItems, setIncotermsItems] = useState<Array<{ label: string; value: string; }>>([]);
  const [minimumOrders, setMinimumOrders] = useState<Array<{ label: string; value: string; }>>([]);

  const [displayPicture, setDisplayPicture] = useState<string>();
  const [assistanceNeeded, setAssistanceNeeded] = useState<boolean>(false);
  const [productPictures, setProductPictures] = useState<any>();
  const [certifications, setCertifications] = useState<any>([]);
  const [incoterms, setIncoterms] = useState<Array<string>>([]);
  const [certificationsFiles, setCertificationsFiles] = useState<any>([]);
  const [hasError, setHasError] = useState(false);

  //Providers
  const { getProducts, getProductTypesByProduct, getVarietiesByProduct, getSustainabilityCertificationsItems, getMinimumOrders, getIncoterms } = useProductCreationProviders();

  // Form
  const methods = useForm<IProductCreationProps>({
    resolver: yupResolver(productCreationFormValidator),
    mode: "all",
  });
  const { control, register, watch, handleSubmit, getValues, formState: { errors: createProductErrors } } = methods;

  const watchProduct = watch("product");

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
    } else {
      data.uuid = localStorage.getItem("uuid") || "fd2e9e21-3c18-4bd2-bf81-1e0956ec5bfd";
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
        //TO-DO multiple pictures
        // productPictures?.forEach(picture => {
        if (productPictures)
          formData.append("images[]", productPictures);
        // });
        const resp = await axios.post(`${ process.env.REACT_APP_BAZAR_URL }/products`, formData, {});
        console.log(JSON.stringify(resp, null, 3));
        alert("Product created successfully!");
      } catch (error) {
        console.log(`Failed: ${ error }`);
        alert("There's been an error: " + error);
        setHasError(true);
      }
    }
  };

  const handleTabSwitch = (index: number) => {
    if (index === 0) {
      setActiveTabIndex(1);
    } else {
      setActiveTabIndex(0);
    }
  };

  const onGetProducts = async () => {
    const resp = await getProducts();
    const productList = resp.data.results.map((product: any) => ({
      label: product.basic_product,
      value: product.uuid,
    }));
    setProducts(productList);
  };

  const onGetProductTypes = async () => {
    const resp = await getProductTypesByProduct(watchProduct);
    const productTypeList = resp.data.results.map((productType: any) => ({
      label: productType.product_type,
      value: productType.uuid,
    }));
    setProductTypes(productTypeList);
  };

  const onGetVarieties = async () => {
    const resp = await getVarietiesByProduct(watchProduct);
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
      label: minimumOrder.minimum_order,
      value: minimumOrder.uuid,
    }));
    setMinimumOrders(minimumOrderList);
  };

  const onChangeCertificationCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newCertifications = [...certifications];
    const index = newCertifications.indexOf(value);
    if (index === -1) {
      newCertifications.push(value);
    } else {
      newCertifications.splice(index, 1);
    }
    setCertifications(newCertifications);
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

  useEffect(() => {
    onGetProducts();
    onGetsustainabilityCertificationsItems();
    onGetIncotermsItems();
    onGetMinimumOrders();
  }, []);

  useEffect(() => {
    watchProduct !== (null || undefined) && onGetProductTypes();
    watchProduct !== (null || undefined) && onGetVarieties();
  }, [watchProduct]);

  useEffect(() => {
    if (productPictures)
      setDisplayPicture(URL.createObjectURL(productPictures.item(0)));
  }, [productPictures]);

  return {
    methods,
    control,
    register,
    getValues,
    handleSubmit,
    submitForm,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    hasError,
    handleTabSwitch,
    activeTabIndex,
    products,
    productTypes,
    varieties,
    sustainabilityCertificationsItems,
    incoterms: incotermsItems,
    minimumOrders,
    certifications,
    assistanceNeeded,
    OnChangeAssistanceNeeded,
    productPictures,
    displayPicture,
    setProductPictures,
    onChangeCertificationCheckbox,
    onChangeIncotermCheckbox,
    onChangeCertificationFile,
  };
};

export default useCreateProduct;