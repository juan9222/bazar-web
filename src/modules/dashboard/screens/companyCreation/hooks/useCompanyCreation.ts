import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import useCommonProviders from "../../../../common/providers";
import { companyCreationFormValidator } from '../validators/index';
import { ICompanyCreationProps, TCompanyCreationKeys } from '../interfaces/index';
import { useForm } from 'react-hook-form';
import useAuthenticator from '../../../../auth/hooks/useAuthenticator';

const useCompanyCreation = () => {
  const [yearsOperations, setYearsOperations] = useState(0);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    fullName: ""
  });
  const [countries, setCountries] = useState<Array<{ label: string; value: string; }>>([]);
  const [cities, setCities] = useState<Array<{ label: string; value: string; }>>([]);
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

  const [avatars, setAvatars] = useState<any>([]);
  const incrementYO = () => setYearsOperations(yO => yO += 1);
  const decrementYO = () => yearsOperations !== 0 && setYearsOperations(yO => yO -= 1);
  const onChangeY0 = (value: any) => {
    const valueIsNaN = Number.isNaN(Number(value));
    if (valueIsNaN) {
      const returnValue = "0";
      setYearsOperations(parseInt(returnValue));
    } else {
      const num = Number(value);
      const returnValue = num >= 0 ? num : 0;
      setYearsOperations(returnValue);
    }
  };
  const onHideAvatars = () => setShowAvatars(false);
  const onShowAvatars = () => setShowAvatars(true);
  const onSelectAvatar = (avatar: any) => setAvatar(avatar);

  // Providers
  const { getCountries, getCitiesByCountryId, getAvatars } = useCommonProviders();

  const { getAuthenticatedUser } = useAuthenticator();


  // Form
  const { register, handleSubmit, watch, formState: { errors: loginErrors } } = useForm<ICompanyCreationProps>({
    resolver: yupResolver(companyCreationFormValidator),
    mode: "all",
  });

  const watchCountry = watch("country");

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
      label: country.name,
      value: country.id
    }));
    setCountries(countryListMutate);
  };

  const onGetCities = async () => {
    const resp = await getCitiesByCountryId(watchCountry);
    const cityList = resp.data.data;
    const cityListMutate = cityList.map((city: any) => ({
      label: city.name,
      value: city.id
    }));
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

  useEffect(() => {
    onGetUserInfo();
    onGetCountries();
    onGetAvatars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    watchCountry !== (null || undefined) && onGetCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchCountry]);


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
  };
};

export default useCompanyCreation;