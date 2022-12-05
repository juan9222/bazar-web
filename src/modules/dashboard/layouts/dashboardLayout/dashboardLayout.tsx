import React, { useState } from "react";
import { FaUserCircle, FaUserAlt } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import { Outlet, NavLink } from "react-router-dom";
import IconLogo from "../../../../assets/svg/icons/iconLogo";
import { AiFillHome } from "react-icons/ai";
import { ImLeaf } from "react-icons/im";
import { MdAccountBalanceWallet, MdLogout } from "react-icons/md";
import { Button, Offcanvas } from "react-bootstrap";
import { IoMenu } from "react-icons/io5";
import useAuthenticator from "../../../auth/hooks/useAuthenticator";



const Dashboardlayout: React.FC<any> = () => {
  const { onLogout } = useAuthenticator();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <NavLink className="dshLayout__nav--btnNav"
          to="/dashboard/create-product">
          <ImLeaf className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Products</p>
        </NavLink>
        <NavLink className="dshLayout__nav--btnNav"
          to="/">
          <HiShoppingCart className="dshLayout__nav--btnNav--icon" />
          <p className="dshLayout__nav--btnNav--label">Purchases</p>
        </NavLink>
        <NavLink className="dshLayout__nav--btnNav"
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
              <FaUserCircle className="dshLayout__body--header--right--icon" />
              <BiDotsVerticalRounded className="dshLayout__body--header--right--icon2" onClick={ onLogout } />
            </div>
            <Offcanvas className="dshLayout__body--header--left mobile-bazar-nav" show={ show } onHide={ handleClose }>
              <Offcanvas.Header className="mobile-bazar-nav__header" closeButton closeVariant="white">
                <img className="user-picture" src="/assets/images/default-avatar.png" alt="card product" />
                <p className="user-name">User Name</p>
                <p className="user-type">Buyer</p>
                <hr className="limiter-line" />
              </Offcanvas.Header>
              <Offcanvas.Body className="mobile-bazar-nav__body">
                <div className="mobile-bazar-nav__body--primary">
                  <NavLink className="item"
                    to="/">
                    <AiFillHome className="item--icon" />
                    <p className="item--label">Home</p>
                  </NavLink>
                  <NavLink className={ ({ isActive }) =>
                    `item ${ isActive ? 'active' : '' }`
                  }
                    to="/dashboard/create-product">
                    <ImLeaf className="item--icon" />
                    <p className="item--label">Products</p>
                  </NavLink>
                  <NavLink className="item"
                    to="/">
                    <HiShoppingCart className="item--icon" />
                    <p className="item--label">Purchases</p>
                  </NavLink>
                  <NavLink className="item"
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
        <Outlet />
      </nav>
    </div>
  );
};

export default Dashboardlayout;
