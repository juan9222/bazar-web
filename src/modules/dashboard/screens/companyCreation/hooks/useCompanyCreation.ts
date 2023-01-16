import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import useCommonProviders from "../../../../common/providers";
import { companyCreationFormValidator } from '../validators/index';
import { ICompanyCreationProps, TCompanyCreationKeys } from '../interfaces/index';
import { useForm } from 'react-hook-form';
import useAuthenticator from '../../../../auth/hooks/useAuthenticator';
import { capitalizeFirstLetter } from '../../../../common/helpers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useCompanyCreation = () => {
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [yearsOperations, setYearsOperations] = useState(0);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    fullName: ""
  });
  const [countries, setCountries] = useState<Array<{ label: string; value: string; }>>([]);
  const [cities, setCities] = useState<Array<{ label: string; value: string; }>>([]);
  const [selectedCountry, setSelectedCountry] = useState<{ country: string, code: number; }>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [showAvatars, setShowAvatars] = useState(false);
  const [avatarModal, setAvatarModal] = useState({
    imageName: "",
    imageUrl: "",
    uuid: ""
  });
  const [avatar, setAvatar] = useState({
    imageName: "",
    imageUrl: "",
    uuid: ""
  });

  const [companyByLawsFile, setCompanyByLawsFile] = useState<any>(null);
  const [optFile, setOptFile] = useState<any>(null);
  const [purchaseOrderFile, setPurchaseOrderFile] = useState<any>(null);

  const [avatars, setAvatars] = useState<any>([]);
  const navigate = useNavigate();


  // Form
  const { register, handleSubmit, setValue, formState: { errors: loginErrors } } = useForm<ICompanyCreationProps>({
    resolver: yupResolver(companyCreationFormValidator),
    mode: "all",
  });
  const incrementYO = () => {
    setYearsOperations(yO => {
      const newValue = yO += 1;
      setValue("yearsInOperations", newValue);
      return newValue;
    });
  };
  const decrementYO = () => {
    yearsOperations !== 0 && setYearsOperations(yO => {
      const newValue = yO -= 1;
      setValue("yearsInOperations", newValue);
      return newValue;
    });
  };
  const onChangeY0 = (value: any) => {
    const valueIsNaN = Number.isNaN(Number(value));
    if (valueIsNaN) {
      const returnValue = "0";
      setYearsOperations(Number(returnValue));
      setValue("yearsInOperations", Number(returnValue));
    } else {
      const num = Number(value);
      const returnValue = num >= 0 ? num : 0;
      setYearsOperations(returnValue);
      setValue("yearsInOperations", returnValue);
    }
  };
  const onHideAvatars = () => setShowAvatars(false);
  const onShowAvatars = () => setShowAvatars(true);
  const onSelectAvatar = (avatar: any) => {
    setValue("profileImage", avatar.imageUrl);
    setAvatar(avatar);
  };

  // Providers
  const { getCountries, getCitiesByCountryId, getAvatars } = useCommonProviders();

  const { getAuthenticatedUser } = useAuthenticator();

  const assignInputName = (inputName: TCompanyCreationKeys): string => {
    return inputName.toString();
  };

  const hasErrorsInput = (inputName: TCompanyCreationKeys): boolean => {
    return loginErrors[inputName] !== undefined;
  };

  const getMessageErrorInput = (inputName: TCompanyCreationKeys): string => {
    return loginErrors[inputName]?.message || "This field is required";
  };

  const onGetUserInfo = async () => {
    const { firstName, lastName } = await getAuthenticatedUser();
    const fullName = `${ firstName } ${ lastName }`;
    setUser({
      firstName,
      lastName,
      fullName
    });
  };

  const onGetCountries = async () => {
    const resp = await getCountries();
    const countryList = resp.data.data;
    const countryListMutate = countryList.map((country: any) => ({
      label: capitalizeFirstLetter(country.name),
      value: country.id
    })).sort((country1: { label: string, value: string; }, country2: { label: string, value: string; }) => {
      if (country1.label < country2.label) return -1;
      if (country1.label > country2.label) return 1;
      return 0;
    });
    setCountries(countryListMutate);
  };

  const onGetCities = async () => {
    const resp = await getCitiesByCountryId(selectedCountry?.code!);
    const cityList = resp.data.data;
    const cityListMutate = cityList.map((city: any) => ({
      label: city.name,
      value: city.id
    })).sort((city1: { label: string, value: string; }, city2: { label: string, value: string; }) => {
      if (city1.label < city2.label) return -1;
      if (city1.label > city2.label) return 1;
      return 0;
    });
    setCities(cityListMutate);
  };

  const onGetAvatars = async () => {
    try {
      const resp = await getAvatars();
      const avatarsResp = resp.data.results;
      const avatarsMutate = avatarsResp.filter((obj: any) => obj.image_name.includes("-m")).map((avatar: any) => ({
        imageName: avatar.image_name,
        imageUrl: avatar.image_url,
        uuid: avatar.uuid
      }));
      setAvatars(avatarsMutate);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeCountry = (option: unknown) => {
    setSelectedCountry({ country: (option as any).label, code: (option as any).value });
  };

  const onChangeCity = (option: unknown) => {
    setSelectedCity((option as any).label);
  };

  const submitForm = async (data: ICompanyCreationProps) => {
    setLoading(true);
    data.city = selectedCity!;
    data.country = selectedCountry?.country!;
    data.uuid = localStorage.getItem("uuid") || "";
    try {
      const files = [companyByLawsFile, optFile, purchaseOrderFile];
      let formData = new FormData();
      const body = {
        company_name: data.companyName,
        address: data.companyAddress,
        chamber_commerce: data.chamberOfCommerce,
        legal_representative: data.legalRepresentative,
        operative_years: Number(data.yearsInOperations),
        country: data.country,
        city: data.city,
        uuid_user: data.uuid,
        profile_image: data.profileImage,
      };
      if (data.profileImage === "") {
        delete body.profile_image;
      }
      formData.append("body", JSON.stringify(body));
      for (let i = 0; i < files.length; i++) {
        formData.append("files[]", files[i]);
      }
      const resp = await axios.post(`${ process.env.REACT_APP_BAZAR_URL }/companies`, formData, {});
      console.log(JSON.stringify(resp, null, 3));
      setLoading(false);
      setShowConfirmationModal(false);
      setShowCongratulationsModal(true);
    } catch (error) {
      console.warn(error);
      setLoading(false);
      setShowConfirmationModal(false);
    }

  };

  const onCreateProduct = () => {
    setShowCongratulationsModal(false);
    navigate("/dashboard/create-product");
  };

  const onCreateProductLater = () => {
    setShowCongratulationsModal(false);
    navigate("/dashboard/home");
  };

  useEffect(() => {
    onGetUserInfo();
    onGetCountries();
    onGetAvatars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    selectedCountry !== (null || undefined) && onGetCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);


  return {
    yearsOperations,
    incrementYO,
    decrementYO,
    user,
    countries,
    register,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    cities,
    showAvatars,
    onShowAvatars,
    onHideAvatars,
    avatars,
    avatar,
    onSelectAvatar,
    setAvatarModal,
    avatarModal,
    onChangeY0,
    handleSubmit,
    submitForm,
    setCompanyByLawsFile,
    setOptFile,
    setPurchaseOrderFile,
    loading,
    showConfirmationModal,
    setShowConfirmationModal,
    showCongratulationsModal,
    setShowCongratulationsModal,
    onCreateProduct,
    onCreateProductLater,
    selectedCountry,
    onChangeCountry,
    selectedCity,
    onChangeCity,
  };
};

export default useCompanyCreation;