import React from "react";
import { IIconProps } from "../../../../shared/interfaces";

const IconArrowDownSelect: React.FC<IIconProps> = (props) => {
  const { color } = props;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.3 14.3L8.70001 11.7C8.38335 11.3833 8.31268 11.021 8.48801 10.613C8.66268 10.2043 8.97501 10 9.42501 10H14.575C15.025 10 15.3373 10.2043 15.512 10.613C15.6873 11.021 15.6167 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4917 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8667 14.6 11.7417 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3V14.3Z" fill={ color ?? "#414C5B" } />
    </svg>

  );
};

export default IconArrowDownSelect;