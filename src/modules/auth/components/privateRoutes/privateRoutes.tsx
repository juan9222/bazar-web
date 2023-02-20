import React, { useEffect, useRef, useState } from 'react';
import { IPrivateRouteProps } from './interfaces';
import useAuthenticator from '../../hooks/useAuthenticator';
import { Outlet } from 'react-router-dom';
import Dashboardlayout from '../../../dashboard/layouts/dashboardLayout';
const PrivateRoute: React.FC<IPrivateRouteProps> = () => {
  const [isLoginReady, setIsLoginReady] = useState(false);

  const {
    goToLogin,
    getAccessToken,
    onLogin,
    onLogout,
    getAuthenticatedUserUuid,
    getAuthenticatedUserRoles
  } = useAuthenticator();

  const shouldInit = useRef(true);

  const onInit = async () => {
    const accessToken = getAccessToken();
    const uuid = getAuthenticatedUserUuid();
    const roles = getAuthenticatedUserRoles();

    if (accessToken && uuid && roles) {
      await onLogin({
        accessToken,
        uuid,
        roles,
      });
      setIsLoginReady(true);
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
      { isLoginReady && (
        <Dashboardlayout>
          <Outlet />
        </Dashboardlayout>
      ) }
    </>
  );
};

export default PrivateRoute;