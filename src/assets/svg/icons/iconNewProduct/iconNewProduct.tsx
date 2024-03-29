import React from "react";
import { IIconProps } from "../../../../shared/interfaces";

const IconNewProduct: React.FC<IIconProps> = (props) => {
  return (
    <svg
      width={ 69 }
      height={ 69 }
      fill="none"
      viewBox="0 0 69 69"
      xmlns="http://www.w3.org/2000/svg"
      { ...props }
    >
      <circle cx={ 34.5 } cy={ 34.5 } r={ 34.5 } fill="#023047" />
      <path
        d="M34.5 12.938c-11.86 0-21.563 9.703-21.563 21.562 0 11.86 9.704 21.563 21.563 21.563 11.86 0 21.563-9.704 21.563-21.563 0-11.86-9.704-21.563-21.563-21.563zm-5.175 32.774c-.474 0-1.121-.172-1.725-.43L26.37 48.3l-2.457-.862.345-.841c2.587-6.512 5.563-13.93 16.71-16.41 0 0-12.937 0-17.141 11.968 0 0-2.265-2.264-2.265-4.852 0-2.587 2.588-8.086 9.057-9.38 1.833-.366 3.881-.646 5.908-.97 5.089-.69 9.983-1.38 10.91-3.234 0 0-3.88 21.993-18.112 21.993z"
        fill="#fff"
      />
      <circle cx={ 49.594 } cy={ 48.156 } r={ 10.781 } fill="#023047" />
      <path
        d="M48.695 42.766a.898.898 0 0 1 1.797 0v10.78a.898.898 0 0 1-1.797 0v-10.78z"
        fill="#fff"
      />
      <path
        d="M44.203 49.055a.898.898 0 0 1 0-1.797h10.781a.898.898 0 0 1 0 1.797h-10.78z"
        fill="#fff"
      />
    </svg>
  );
};

export default IconNewProduct;