import React from "react";
import { Outlet } from "react-router-dom";

const Authlayout: React.FC<any> = () => {
  return (
    <div className="layoutContainer">
      <section className="layoutContainer__content">
        <Outlet />
      </section>
      <div className="layoutContainer__bg">
        <img src="/assets/images/bg-login.png" alt="bazar Auth" />
      </div>
    </div>
  );
};

export default Authlayout;
