import React from "react";
import Button from "../../../common/components/button";
import {EBtnVisibleType} from "../../../common/components/button/interfaces";
import Logo from "../../../../assets/svg/icons/iconLogo"
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {

  const navigate = useNavigate();
 
  return (
    <div className="not-found">
      <div className="not-found_content">
        <div className="not-found_content_title">
          404
        </div>

        <div className="not-found_content_text">
          <h2>Ooops, page not found</h2>
          Sorry, but the requested page could not be found
          <Button visibleType={EBtnVisibleType.outlineWhite} onClick={() => {navigate("/")}}>Go home</Button>
          
        </div>

        <Logo className="logo-white"></Logo>
      </div>

    </div>
  );
};

export default NotFound;
