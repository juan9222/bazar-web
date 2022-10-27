import React from "react";
import IconLogo from "../../../../assets/svg/icons/iconLogo";
import HeroAuth from "../../components/heroAuth";
import { IAuthLayoutContentProps } from "./interfaces";

const AuthlayoutContent: React.FC<IAuthLayoutContentProps> = (props) => {
  const { title, subtitle, children } = props;
  return (
    <div className="layoutContainerContent">
      <div className="layoutContainerContent__logo">
        <IconLogo/>
      </div>
      <HeroAuth
        title={ title }
        subtitle={ subtitle }
      />
      <div className="layoutContainerContent__content">
        { children }
      </div>
    </div>
  );
};

export default AuthlayoutContent;
