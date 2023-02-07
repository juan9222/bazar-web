import React from "react";
import IconLogo from "../../../../assets/svg/icons/iconLogo";
import HeroAuth from "../../components/heroAuth";
import { IAuthLayoutContentProps } from "./interfaces";

const AuthlayoutContent: React.FC<IAuthLayoutContentProps> = (props) => {
  const { title, subtitle, children } = props;
  const appVersion = process.env.REACT_APP_VERSION;
  return (
    <>
      <div className="layoutContainerContent">
        <div className="layoutContainerContent__logo">
          <IconLogo />
        </div>
        <HeroAuth
          title={ title }
          subtitle={ subtitle }
        />
        <div className="layoutContainerContent__content">
          { children }
        </div>
      </div>
      <div className="loginContainer__version">
        <p className="smallText textAlignCenter">Beta { appVersion }</p>
      </div>
    </>
  );
};

export default AuthlayoutContent;
