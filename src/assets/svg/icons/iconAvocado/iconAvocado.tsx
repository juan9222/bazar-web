import React from "react";
import { IIconProps } from "../../../../shared/interfaces";

const IconAvocado: React.FC<IIconProps> = (props) => {
  return (
    <svg
      width={ '1em' }
      height={ '1em' }
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      { ...props }
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.973 7.027c.128.91.252 1.786.527 2.473.37.923.807 1.642 1.212 2.307C18.403 12.943 19 13.923 19 15.5c0 4.5-3.75 6.5-7 6.5s-7-2-7-6.5c0-2.25.844-3.656 1.688-5.063C6.968 9.97 7.25 9.5 7.5 9c.282-.564.405-1.366.537-2.227C8.373 4.578 8.769 2 12 2c3.263 0 3.634 2.629 3.973 5.027zM14.12 17.121A3 3 0 0 0 15 15c0-1.657-1.343-3.75-3-3.75S9 13.343 9 15a3 3 0 0 0 5.121 2.121z"
      />
    </svg>
  );
};

export default IconAvocado;