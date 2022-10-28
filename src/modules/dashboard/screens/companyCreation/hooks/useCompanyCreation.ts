import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import useCommonProviders from "../../../../common/providers";
import { companyCreationFormValidator } from '../validators/index';
import { ICompanyCreationProps, TCompanyCreationKeys } from '../interfaces/index';
import { useForm } from 'react-hook-form';

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
  const [avatar, setAvatar] = useState({
    imageName: "",
    imageUrl: "",
    uuid: ""
  });
  const [avatars, setAvatars] = useState<any>([]);
  const incrementYO = () => setYearsOperations(yO => yO += 1);
  const decrementYO = () => yearsOperations !== 0 && setYearsOperations(yO => yO -= 1);
  const onHideAvatars = () => setShowAvatars(false);
  const onShowAvatars = () => setShowAvatars(true);
  const onSelectAvatar = (avatar: any) => setAvatar(avatar);

  // Providers
  const { getUserInfoByUuid, getCountries, getCitiesByCountryId, getAvatars } = useCommonProviders();


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
    const resp = await getUserInfoByUuid();
    const { firstName, lastName } = resp.data.data;
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
      // const resp = await getAvatars();
      const avatarsDummy = [
        {
          image_name: "astronaut-s",
          image_url: "https://s3-offchain-test.s3.us-east-2.amazonaws.com/profile_images/astronaut-s.png",
          uuid: "0860ee2b-b689-4618-9087-de6bac1a054e"
        },
        {
          image_name: "astronaut-m",
          image_url: "https://s3-offchain-test.s3.us-east-2.amazonaws.com/profile_images/astronaut-m.png",
          uuid: "7df80df2-2d99-4a5b-94db-2c70d37fe01a"
        },
        {
          image_name: "astronaut-b",
          image_url: "https://s3-offchain-test.s3.us-east-2.amazonaws.com/profile_images/astronaut-b.png",
          uuid: "eb0f168e-b5d7-4abe-aaad-57c34bdbc77c"
        },
        {
          image_name: "woman1-s",
          image_url: "https://s3-offchain-test.s3.us-east-2.amazonaws.com/profile_images/woman1-s.png",
          uuid: "ae3f4122-9a53-4838-a100-b533a2cc8390"
        },
        {
          image_name: "woman1-m",
          image_url: "https://s3-offchain-test.s3.us-east-2.amazonaws.com/profile_images/woman1-m.png",
          uuid: "9e36840e-d88a-41f4-ae09-f498fa86f401"
        },
        {
          image_name: "woman1-b",
          image_url: "https://s3-offchain-test.s3.us-east-2.amazonaws.com/profile_images/woman1-b.png",
          uuid: "d0d73da3-2567-4a4c-b5b5-c6d994fde16f"
        },
        {
          image_name: "dad-s",
          image_url: "https://s3-offchain-test.s3.us-east-2.amazonaws.com/profile_images/dad-s.png",
          uuid: "77f5c209-b7b7-45fb-955a-da3241f50cf3"
        },
        {
          image_name: "dad-m",
          image_url: "https://s3-offchain-test.s3.us-east-2.amazonaws.com/profile_images/dad-m.png",
          uuid: "788d44aa-ea04-4554-93cb-0b84eb908c37"
        },
        {
          image_name: "dad-b",
          image_url: "https://s3-offchain-test.s3.us-east-2.amazonaws.com/profile_images/dad-b.png",
          uuid: "7dd06cd7-2fc0-476f-8555-2a74e29b2962"
        },
      ];

      const avatarsMutate = avatarsDummy.map(avatar => ({
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
  };
};

export default useCompanyCreation;