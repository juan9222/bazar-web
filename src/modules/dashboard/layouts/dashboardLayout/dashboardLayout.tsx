import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import IconLogo from "../../../../assets/svg/icons/iconLogo";
import { AiFillHome } from "react-icons/ai";
import { ImLeaf } from "react-icons/im";
import { MdAccountBalanceWallet, MdLocalOffer } from "react-icons/md";
import useAuthenticator from "../../../auth/hooks/useAuthenticator";

const Dashboardlayout: React.FC<any> = () => {
  const { onLogout } = useAuthenticator();
  return (
    <div className="dshLayout">
      <nav className="dshLayout__nav">
        <div className="dshLayout__nav--btnNav">
          <AiFillHome className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Home</p>
        </div>
        <div className="dshLayout__nav--btnNav">
          <ImLeaf className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Products</p>
        </div>
        <div className="dshLayout__nav--btnNav">
          <MdLocalOffer className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Sales</p>
        </div>
        <div className="dshLayout__nav--btnNav">
          <MdAccountBalanceWallet className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Wallet</p>
        </div>
      </nav>
      <nav className="dshLayout__body">
        <header className="dshLayout__body--header">
          <div className="dshLayout__body--header--logo">
            <IconLogo width={ 123 } />
          </div>
          <div className="dshLayout__body--header--right">
            <FaUserCircle className="dshLayout__body--header--right--icon" />
            <BiDotsVerticalRounded className="dshLayout__body--header--right--icon2" onClick={ onLogout } />
          </div>
        </header>
        <Outlet />
      </nav>
    </div>
  );
};

export default Dashboardlayout;
