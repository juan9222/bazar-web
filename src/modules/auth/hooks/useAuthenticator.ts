
import { useNavigate } from 'react-router-dom';
import useAuthenticationProviders from "../providers";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  setDefaultAuthorizationToken,
} from "../../common/helpers"
import {ILoginProvider, IAuthConfirmationRequest, IRegisterFormProps} from "../interfaces";


const useAuthenticator = () => {
  const {
    loginProvider,
    getUserByUuid,
    enrollSmsProvider,
    confirmEnrollProvider,
    confirmLoginChallengeProvider,
    registerProvider,
  } = useAuthenticationProviders();
  const navigate = useNavigate();

  const requestAuthentication = async (credentials: ILoginProvider) => {
    const response: any = await loginProvider(credentials);
    const { oobCode, mfaToken, userDTO, phoneNumber } = response.data.data;

    return {
      oobCode,
      mfaToken,
      userDTO,
      phoneNumber,
    };
  };

  const requestEnrollment = async (credentials: ILoginProvider) => {
    const response: any = await enrollSmsProvider(credentials);
    return response?.data?.data;
  };

  const confirmEnrollment = async (confirmationData: IAuthConfirmationRequest) => {
    const response: any = await confirmEnrollProvider(confirmationData);
    return response?.data?.data;
  };

  const confirmAuthentication = async (confirmationData: IAuthConfirmationRequest) => {
    const response: any = await confirmLoginChallengeProvider(confirmationData);
    return response?.data?.data;
  };

  const requestUserRegister = async (newUserData: IRegisterFormProps) => {
    const response: any = await registerProvider(newUserData);
    return response?.data?.data;
  };

  const getAccessToken = () => {
    return getLocalStorageItem('accessToken');
  };

  const getAuthenticatedUser = async () => {
    const uuid = getLocalStorageItem('uuid');
    if(!uuid) return null;
    
    const response: any = await getUserByUuid(uuid);

    return response?.data?.data;
  };

  const onLogin = async ({uuid, accessToken, roles}: {uuid: string, accessToken: string, roles: string}) => {
    setLocalStorageItem('uuid', uuid);
    setLocalStorageItem('accessToken', accessToken);
    setLocalStorageItem('roles', roles);
    setDefaultAuthorizationToken(accessToken);
  }

  const goToLogin = (params?: any) => {
    if (params) navigate(`/auth/login?${new URLSearchParams(params)}`)
    else navigate(`/auth/login`)
  }

  const onLogout = async () => {
    removeLocalStorageItem('uuid');
    removeLocalStorageItem('accessToken');
    removeLocalStorageItem('roles');
    setDefaultAuthorizationToken('');
    goToLogin();
  }

  const getAuthenticatedUserUuid = () => {
    return getLocalStorageItem('uuid');
  };

  const getAuthenticatedUserRoles = () => {
    return getLocalStorageItem('roles');
  };

  return {
    requestAuthentication,
    getAccessToken,
    getAuthenticatedUser,
    requestEnrollment,
    confirmEnrollment,
    confirmAuthentication,
    requestUserRegister,
    onLogin,
    onLogout,
    goToLogin,
    getAuthenticatedUserUuid,
    getAuthenticatedUserRoles,
  }
}

export default useAuthenticator;