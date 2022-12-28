import React, { useRef, useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import { Outlet, NavLink, useOutletContext } from "react-router-dom";
import IconLogo from "../../../../assets/svg/icons/iconLogo";
import { AiFillHome } from "react-icons/ai";
import { ImLeaf } from "react-icons/im";
import { MdAccountBalanceWallet, MdCheckCircle, MdLogout, MdOutlineLanguage } from "react-icons/md";
import { Button, ListGroup, ListGroupItem, Offcanvas, Overlay } from "react-bootstrap";
import { IoMenu } from "react-icons/io5";
import useAuthenticator from "../../../auth/hooks/useAuthenticator";
import useCommonProviders from "../../../common/providers";
import InputText from "../../../common/components/inputText";
import WalletConnectionBSCSelection from "../../../wallet/components/WalletConnectionBSC";
import { Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";

type ContextType = {
  authenticatedUser: {
    firstName: "",
    lastName: "",
    role: "",
    profileImage: "",
    company: "",
  } | null;
};

const Dashboardlayout: React.FC<any> = () => {
  const { onLogout, getAuthenticatedUser } = useAuthenticator();

  const [show, setShow] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<{
    firstName: "",
    lastName: "",
    role: "",
    profileImage: "",
    company: "",
  }>();
  const [showWallet, setShowWallet] = useState(false);
  const walletRef = useRef<any>();
  const [walletActive, setWalletActive] = useState(false);

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

  const handleWallet = () => setShowWallet(!showWallet);
  const handleWalletActive = () => {
    setShowWallet(!showWallet);
    setWalletActive(!walletActive);
  };
  const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
    return new Web3Provider(provider);
  };

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
        <NavLink className={ ({ isActive }) =>
          `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
        }
          to="/">
          <HiShoppingCart className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Purchases</p>
        </NavLink>
        <NavLink className={ ({ isActive }) =>
          `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
        }
          to="/">
          <MdAccountBalanceWallet className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Wallet</p>
        </NavLink>
        <NavLink className={ ({ isActive }) =>
          `dshLayout__nav--btnNav ${ isActive ? 'active' : '' }`
        }
          to="/dashboard/user-approvals">
          <FaUserAlt className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Users</p>
        </NavLink>
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
              <div ref={ walletRef } onClick={ handleWallet } className={ `dshLayout__body--header--right--icon4 ${ walletActive ? 'checked' : '' }` }>
                <MdAccountBalanceWallet />
              </div>
              <Overlay rootClose onHide={ handleWallet } transition={ false } target={ walletRef.current } show={ showWallet } placement="bottom-end">
                { (props) => (
                  <div
                    { ...props }
                    className="dshLayout__body--header--right--listMenu"
                  >
                    <ListGroup variant="flush">
                      { !walletActive ? (
                        <ListGroupItem action onClick={ handleWalletActive } className="dshLayout__body--header--right--listMenu--item">
                          <img className="dshLayout__body--header--right--listMenu--item--icon" src={ "/assets/images/binance-logo-s.png" } alt="Binance" /> <strong className="formText">Binance wallet</strong>
                        </ListGroupItem>
                      ) : '' }
                      { walletActive ? (
                        <ListGroupItem className="dshLayout__body--header--right--listMenu--item checked">
                          <img className="dshLayout__body--header--right--listMenu--item--icon" src={ "/assets/images/binance-logo-s.png" } alt="Binance" />
                          <strong className="formText">Binance wallet</strong>
                          <MdCheckCircle className="dshLayout__body--header--right--listMenu--item--iconCheck" />
                          <InputText
                            disabled
                            name={ 'name' }
                            type={ "number" }
                            placeholder={ "0xCfk...3720e423g" }
                            autoComplete={ "off" } />
                          <img className="dshLayout__body--header--right--listMenu--item--iconButton" src={ "/assets/images/copy-icon.png" } alt="Binance" />
                        </ListGroupItem>
                      ) : '' }
                      { walletActive ? (
                        <ListGroupItem action onClick={ handleWalletActive } className="dshLayout__body--header--right--listMenu--item checked">
                          <MdLogout className="dshLayout__body--header--right--listMenu--item--iconLogout" /> <strong className="formText">Log out</strong>
                        </ListGroupItem>
                      ) : '' }
                    </ListGroup>
                  </div>
                ) }
              </Overlay>
              <MdOutlineLanguage className="dshLayout__body--header--right--icon3" />
              {
                <Web3ReactProvider getLibrary={ getLibrary }>
                  <WalletConnectionBSCSelection />
                </Web3ReactProvider>
              }
              <img className="dshLayout__body--header--right--icon" src={ authenticatedUser?.profileImage || "/assets/images/default-avatar.png" } alt="card product" />
              <BiDotsVerticalRounded className="dshLayout__body--header--right--icon2" onClick={ onLogout } />
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
