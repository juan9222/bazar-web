
import useAuthenticationProviders from "../providers";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  getRolesToStorage,
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
    const accessToken = getLocalStorageItem('accessToken');
    if(accessToken) return `Bearer ${accessToken}`;
    return accessToken;
  };

  const getAuthenticatedUser = async () => {
    const uuid = getLocalStorageItem('uuid');
    if(!uuid) return null;
    
    const response: any = await getUserByUuid(uuid);

    return response?.data?.data;
  };

  const onLogin = async ({uuid, accessToken, roles}: {uuid: string, accessToken: string, roles: any}) => {
    setLocalStorageItem('uuid', uuid);
    setLocalStorageItem('accessToken', accessToken);
    setLocalStorageItem('roles', getRolesToStorage(roles));
    setDefaultAuthorizationToken(accessToken);
  }

  const onLogout = async () => {
    removeLocalStorageItem('uuid');
    removeLocalStorageItem('accessToken');
    removeLocalStorageItem('roles');
    setDefaultAuthorizationToken('');
  }

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
  }
}

export default useAuthenticator;