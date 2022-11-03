import React, { useEffect, useRef } from 'react';
import { IPrivateRouteProps } from './interfaces';
import useAuthenticator from '../../hooks/useAuthenticator';
const PrivateRoute: React.FC<IPrivateRouteProps> = (props) => {
  const { children } = props;
  const {
    goToLogin,
    getAccessToken,
    onLogin,
    onLogout,
    getAuthenticatedUserUuid,
    getAuthenticatedUserRoles
  } = useAuthenticator();

  const shouldInit = useRef(true);
  
  const onInit = () => {
    const accessToken = getAccessToken();
    const uuid = getAuthenticatedUserUuid();
    const roles = getAuthenticatedUserRoles();

    if (accessToken && uuid && roles) {
      onLogin({
        accessToken,
        uuid,
        roles,
      });
    } else {
      onLogout();
      goToLogin();
    }
  };

  useEffect(() => {
    // Prevents onInit function from being called twice or on each mount
    if (shouldInit.current) {
      shouldInit.current = false;
      onInit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      { children} 
    </>
  );
};

export default PrivateRoute;