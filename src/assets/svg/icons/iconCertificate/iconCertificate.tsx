import React from "react";
import { IIconProps } from "../../../../shared/interfaces";

const IconCertificate: React.FC<IIconProps> = (props) => {
  return (
    <svg
      width={ 18 }
      height={ 18 }
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      { ...props }
    >
      <g clipPath="url(#a)">
        <path
          d="M.027 10.137a.795.795 0 0 0 .373.486l1.53.884v1.762a.8.8 0 0 0 .8.8h1.762l.884 1.53a.803.803 0 0 0 1.094.293L8 15.01l1.53.884a.803.803 0 0 0 1.094-.293l.883-1.529h1.762a.801.801 0 0 0 .8-.8V11.51l1.53-.884a.8.8 0 0 0 .293-1.094L15.008 8l.885-1.53a.8.8 0 0 0-.293-1.093l-1.53-.885v-1.76a.801.801 0 0 0-.8-.8h-1.762l-.884-1.53A.804.804 0 0 0 9.53.109L8 .992 6.47.108A.8.8 0 0 0 5.376.4l-.884 1.53H2.73a.801.801 0 0 0-.8.801v1.762L.4 5.378a.802.802 0 0 0-.292 1.094L.99 8 .107 9.53a.803.803 0 0 0-.08.607z"
          fill="#52B69A"
        />
      </g>
      <g clipPath="url(#b)">
        <path
          d="M13.059 5.458c-2.145 1.259-1.991 3.843-3.494 5.01-1.13.877-2.726.433-3.649.055 0 0-.625.79-1.074 1.841-.15.353-.809-.036-.693-.334 1.466-3.784 6.454-5.671 6.454-5.671s-3.52-.15-5.872 2.924c-.063-.702-.167-2.601 1.654-3.766 2.47-1.58 7.174-.352 6.674-.059z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
        <clipPath id="b">
          <path
            fill="#fff"
            transform="translate(3.692 3.692)"
            d="M0 0h9.846v9.846H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconCertificate;