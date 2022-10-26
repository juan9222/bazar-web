import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import useCommonProviders from "../../../../common/providers";
import { companyCreationFormValidator } from '../validators/index';
import { ICompanyCreationProps, TCompanyCreationKeys } from '../interfaces/index';
import { useForm } from 'react-hook-form';

const useCompanyCreation = () => {
  const [yearsOperations, setYearsOperations] = useState(0);
  const [userName, setUserName] = useState("");
  const [countries, setCountries] = useState<Array<{ label: string; value: string; }>>([]);
  const [cities, setCities] = useState<Array<{ label: string; value: string; }>>([]);
  const incrementYO = () => setYearsOperations(yO => yO += 1);
  const decrementYO = () => yearsOperations !== 0 && setYearsOperations(yO => yO -= 1);

  // Providers
  const { getUserInfoByUuid, getCountries, getCitiesByCountryId } = useCommonProviders();


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
    const fullname = `${ firstName } ${ lastName }`;
    setUserName(fullname);
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

  useEffect(() => {
    onGetUserInfo();
    onGetCountries();
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
    userName,
    countries,
    register,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    cities,
  };
};

export default useCompanyCreation;