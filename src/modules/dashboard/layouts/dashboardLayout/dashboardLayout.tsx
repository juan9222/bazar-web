import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { Outlet, NavLink, useOutletContext } from "react-router-dom";
import IconLogo from "../../../../assets/svg/icons/iconLogo";
import { AiFillHome } from "react-icons/ai";
import { ImLeaf } from "react-icons/im";
import { MdAccountBalanceWallet, MdLogout, MdOutlineLanguage } from "react-icons/md";
import { Button, Offcanvas } from "react-bootstrap";
import { IoMenu } from "react-icons/io5";
import useAuthenticator from "../../../auth/hooks/useAuthenticator";
import useCommonProviders from "../../../common/providers";
import WalletConnectionBSCSelection from "../../../wallet/components/WalletConnectionBSC";
import { Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import UserMenu from "./components/userMenu/userMenu";
import { BiHeart } from "react-icons/bi";

type ContextType = {
  authenticatedUser: {
    firstName: string,
    lastName: string,
    role: string,
    profileImage: string,
    company: string,
  } | null;
};

const Dashboardlayout: React.FC<any> = () => {
  const { onLogout, getAuthenticatedUser } = useAuthenticator();

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

  const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
    return new Web3Provider(provider);
  };

  const isSeller = authenticatedUser && authenticatedUser.role === "Seller";
  const isBuyer = authenticatedUser && authenticatedUser.role === "Buyer";

  return (
    <div className="dshLayout">
      <nav className="dshLayout__nav">
        <NavLink className={ ({ isActive }) =>
          `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
        }
          to="/">
          <AiFillHome className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Home</p>
        </NavLink>
        <NavLink className={ ({ isActive }) =>
          `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
        }
          to="/dashboard/product-list">
          <ImLeaf className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Products</p>
        </NavLink>
        { isBuyer && (
          <NavLink className={ ({ isActive }) =>
            `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
          }
            to="/">
            <HiShoppingCart className="dshLayout__nav--btnNav--icon" />
            <p className="dshLayout__nav--btnNav--label">Purchases</p>
          </NavLink>
        ) }
        <NavLink className={ ({ isActive }) =>
          `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
        }
          to="/">
          <MdAccountBalanceWallet className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Wallet</p>
        </NavLink>
        { isBuyer && (
          <NavLink className={ ({ isActive }) =>
            `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
          }
            to="/dashboard/wishlist">
            <BiHeart className="dshLayout__nav--btnNav--icon" />
            <p className="dshLayout__nav--btnNav--label">Wishlist</p>
          </NavLink>
        ) }
        { !isSeller && !isBuyer && (
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
                  <WalletConnectionBSCSelection />
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
                  <NavLink className={ ({ isActive }) =>
                    `item ${ isActive ? 'active' : '' }`
                  }
                    to="/">
                    <AiFillHome className="item--icon" />
                    <p className="item--label">Home</p>
                  </NavLink>
                  <NavLink className={ ({ isActive }) =>
                    `item ${ isActive ? 'active' : '' }`
                  }
                    to="/dashboard/product-list">
                    <ImLeaf className="item--icon" />
                    <p className="item--label">Products</p>
                  </NavLink>
                  <NavLink className={ ({ isActive }) =>
                    `item ${ isActive ? 'active' : '' }`
                  }
                    to="/">
                    <HiShoppingCart className="item--icon" />
                    <p className="item--label">Purchases</p>
                  </NavLink>
                  <NavLink className={ ({ isActive }) =>
                    `item ${ isActive ? 'active' : '' }`
                  }
                    to="/">
                    <MdAccountBalanceWallet className="item--icon" />
                    <p className="item--label">Wallet</p>
                  </NavLink>
                  <hr className="limiter-line" />
                </div>
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
          <Outlet context={ { authenticatedUser } } />
        </div>
      </nav>
    </div >
  );
};

export default Dashboardlayout;

export function useUser() {
  return useOutletContext<ContextType>();
}
