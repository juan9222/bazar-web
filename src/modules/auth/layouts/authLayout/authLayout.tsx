import React from "react";
import { Outlet } from "react-router-dom";

const Authlayout: React.FC<any> = (props) => {
  const {} = props;
  return (
    <div>
      <p>Bazar Layout</p>
      <Outlet />
    </div>
  );
};

export default Authlayout;
