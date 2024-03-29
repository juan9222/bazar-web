import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { Outlet, NavLink } from "react-router-dom";
import IconLogo from "../../../../assets/svg/icons/iconLogo";
import { AiFillHome } from "react-icons/ai";
import { ImLeaf } from "react-icons/im";
import { MdAccountBalanceWallet, MdLogout, MdOutlineLanguage, MdNotifications, MdAttachMoney } from "react-icons/md";
import { Button, Offcanvas } from "react-bootstrap";
import { IoMenu } from "react-icons/io5";
import useAuthenticator from "../../../auth/hooks/useAuthenticator";
import useCommonProviders from "../../../common/providers";
import WalletConnectionBSCSelection from "../../../wallet/components/WalletConnectionBSC";
import { Web3ReactProvider } from '@web3-react/core';
import UserMenu from "./components/userMenu/userMenu";
import { BiHeart } from "react-icons/bi";
import { isAdmin, isBuyer } from "./utils";
import { TbWorld } from "react-icons/tb";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { Web3Provider } from "@ethersproject/providers";

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  console.log("getLibrary:", library);
  return library;
};

const Dashboardlayout: React.FC<any> = () => {
  const { onLogout, getAuthenticatedUser } = useAuthenticator();

  const [binanceAccount, setBinanceAccount] = useState<{
    myAccount: String;
  }>();

  const [show, setShow] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<{
    firstName: string,
    lastName: string,
    role: string,
    profileImage: string,
    company: string,
  }>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { getUser } = useCommonProviders();

  const onGetAuthenticatedUser = async () => {
    const { data: { rol: role, company } } = await getUser(localStorage.getItem("uuid") || "");
    const { firstName, lastName } = await getAuthenticatedUser();
    setAuthenticatedUser({
      firstName,
      lastName,
      role: role[0].toUpperCase() + role.substr(1).toLowerCase(),
      profileImage: company[0].profile_image_url,
      company: company[0].company_name,
    });
  };

  useEffect(() => {
    onGetAuthenticatedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dshLayout">
      <nav className="dshLayout__nav">
        { !isAdmin() && (
          <NavLink className={ ({ isActive }) =>
            `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
          }
            to="/dashboard/">
            <AiFillHome className="dshLayout__nav--btnNav--icon" />
            <p className="dshLayout__nav--btnNav--label">Home</p>
          </NavLink>
        ) }
        { !isAdmin() && (
          <NavLink className={ ({ isActive }) =>
            `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
          }
            to="/dashboard/product-list">
            <ImLeaf className="dshLayout__nav--btnNav--icon" />
            <p className="dshLayout__nav--btnNav--label">Products</p>
          </NavLink>
        ) }
        { isBuyer() && (
          <NavLink className={ ({ isActive }) =>
            `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
          }
            to="/dashboard/purchase">
            <HiShoppingCart className="dshLayout__nav--btnNav--icon" />
            <p className="dshLayout__nav--btnNav--label">Purchases</p>
          </NavLink>
        ) }
        { !isAdmin() && (
          <NavLink className={ ({ isActive }) =>
            `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
          }
            to="/dashboard/wallet">
            <MdAccountBalanceWallet className="dshLayout__nav--btnNav--icon" />
            <p className="dshLayout__nav--btnNav--label">Wallet</p>
          </NavLink>
        ) }
        { isBuyer() && (
          <NavLink className={ ({ isActive }) =>
            `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
          }
            to="/dashboard/wishlist">
            <BiHeart className="dshLayout__nav--btnNav--icon" />
            <p className="dshLayout__nav--btnNav--label">Wishlist</p>
          </NavLink>
        ) }
        { isAdmin() && (
          <NavLink className={ ({ isActive }) =>
            `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
          }
            to="/dashboard/user-approvals">
            <FaUserAlt className="dshLayout__nav--btnNav--icon" />
            <p className="dshLayout__nav--btnNav--label">Users</p>
          </NavLink>
        ) }
      </nav>
      <nav className="dshLayout__body">
        <header className="dshLayout__body--header">
          <div className="dshLayout__body--header--content">
            <Button className="btn-header-mobile" onClick={ handleShow }>
              <IoMenu />
            </Button>
            <div className="dshLayout__body--header--logo">
              <IconLogo width={ 123 } />
            </div>
            <div className="dshLayout__body--header--right">
              {
                <Web3ReactProvider getLibrary={ getLibrary }>
                  <WalletConnectionBSCSelection icon onAccountChange={ setBinanceAccount } />
                </Web3ReactProvider>
              }
              <MdOutlineLanguage className="dshLayout__body--header--right--icon3" />
              <UserMenu authenticatedUser={ authenticatedUser } onLogout={ onLogout } />
            </div>
            <Offcanvas className="dshLayout__body--header--left mobile-bazar-nav" show={ show } onHide={ handleClose }>
              <Offcanvas.Header className="mobile-bazar-nav__header" closeButton closeVariant="white">
                <img className="user-picture" src={ authenticatedUser?.profileImage || "/assets/images/default-avatar.png" } alt="card product" />
                <p className="user-name">{ `${ authenticatedUser?.firstName } ${ authenticatedUser?.lastName }` }</p>
                <p className="user-type">{ authenticatedUser?.role }</p>
                <hr className="limiter-line" />
              </Offcanvas.Header>
              <Offcanvas.Body className="mobile-bazar-nav__body">
                <div className="mobile-bazar-nav__body--primary">
                  { !isAdmin() && (
                    <NavLink className={ ({ isActive }) =>
                      `item ${ isActive ? 'active' : '' }`
                    }
                      to="/dashboard/">
                      <AiFillHome className="item--icon" />
                      <p className="item--label">Home</p>
                    </NavLink>
                  ) }
                  { !isAdmin() && (
                    <NavLink className={ ({ isActive }) =>
                      `item ${ isActive ? 'active' : '' }`
                    }
                      to="/dashboard/product-list">
                      <ImLeaf className="item--icon" />
                      <p className="item--label">Products</p>
                    </NavLink>
                  ) }
                  { isBuyer() && (
                    <NavLink className={ ({ isActive }) =>
                      `item ${ isActive ? 'active' : '' }`
                    }
                      to="/dashboard/wishlist">
                      <BiHeart className="item--icon" />
                      <p className="item--label">Wishlist</p>
                    </NavLink>
                  ) }
                  <hr className="limiter-line" />
                </div>
                { isAdmin() ? (
                  <div className="mobile-bazar-nav__body--secondary">
                    <NavLink className={ ({ isActive }) =>
                      `item ${ isActive ? 'active' : '' }`
                    }
                      to="/dashboard/user-approvals">
                      <FaUserAlt className="item--icon" />
                      <p className="item--label">Users</p>
                    </NavLink>
                    <hr className="limiter-line" />
                  </div>
                ) : (
                  <div className="mobile-bazar-nav__body--secondary">
                    <NavLink className={ ({ isActive }) =>
                      `item ${ isActive ? 'active' : '' }`
                    }
                      to="/profile">
                      <FaUserAlt className="item--icon" />
                      <p className="item--label">Profile</p>
                    </NavLink>
                    <NavLink className={ ({ isActive }) =>
                      `item ${ isActive ? 'active' : '' }`
                    }
                      to="/notifications">
                      <MdNotifications className="item--icon" />
                      <p className="item--label">Notifications</p>
                    </NavLink>
                    <NavLink className={ ({ isActive }) =>
                      `item ${ isActive ? 'active' : '' }`
                    }
                      to="/change-currency">
                      <MdAttachMoney className="item--icon" />
                      <p className="item--label">Change currency</p>
                    </NavLink>
                    <NavLink className={ ({ isActive }) =>
                      `item ${ isActive ? 'active' : '' }`
                    }
                      to="/change-language">
                      <TbWorld className="item--icon" />
                      <p className="item--label">Change language</p>
                    </NavLink>
                    <a className="item" href="https://www.bazar.network/creation-user-seller" target="_blank" rel="noopener noreferrer">
                      <BsFillBookmarkStarFill className="item--icon" />
                      <p className="item--label">User guides</p>
                    </a>
                    <button className="btn-connect-wallet">
                      <WalletConnectionBSCSelection />
                    </button>
                    <hr className="limiter-line" />
                  </div>
                )
                }
                <div className="mobile-bazar-nav__body--closed">
                  <Button className="btn-logout-closed item" onClick={ onLogout }>
                    <MdLogout className="item--icon" />
                    <p className="item--label">Log out</p>
                  </Button>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </header>
        <div className="dshLayout__body--main">
          <Outlet context={ { authenticatedUser, binanceAccount } } />
        </div>
      </nav>
    </div >
  );
};

export default Dashboardlayout;
