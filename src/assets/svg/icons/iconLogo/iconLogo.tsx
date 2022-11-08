import React from "react";
import { IIconProps } from "../../../../shared/interfaces";

const IconLogo: React.FC<IIconProps> = (props) => {
  const { className } = props;
  return (
    <svg className={className || "logo"} width="258" height="63" viewBox="0 0 258 63" fill="none" xmlns="http://www.w3.org/2000/svg" { ...props }>
      <path fillRule="evenodd" clipRule="evenodd" d="M233.71 36.5921V62.6077H244.534V36.5921C244.534 29.6626 249.442 24.0705 256.616 24.0705H258V14.5881H256.616C244.03 14.5881 233.71 24.4352 233.71 36.5921Z" />
      <mask id="mask0_135_191" maskUnits="userSpaceOnUse" x="172" y="14" width="52" height="49">
        <path fillRule="evenodd" clipRule="evenodd" d="M172.545 14.5881H223.139V62.6077H172.545V14.5881Z" fill="white" />
      </mask>
      <g mask="url(#mask0_135_191)">
        <path fillRule="evenodd" clipRule="evenodd" d="M197.968 24.5568C206.022 24.5568 212.441 30.8783 212.441 38.5372C212.441 46.6823 206.148 52.6391 197.968 52.6391C189.787 52.6391 183.495 46.6823 183.495 38.5372C183.495 30.5136 189.787 24.5568 197.968 24.5568ZM197.968 62.6077C203.38 62.6077 208.665 60.9058 212.441 57.8666V62.6077H223.139V37.5646C223.139 24.9215 212.567 14.5881 199.352 14.5881H197.968C183.872 14.5881 172.545 25.1646 172.545 38.5372C172.545 51.9097 183.872 62.6077 197.968 62.6077Z" />
      </g>
      <path fillRule="evenodd" clipRule="evenodd" d="M85.4547 24.5568C93.5093 24.5568 99.9278 30.8783 99.9278 38.5372C99.9278 46.6823 93.6352 52.6391 85.4547 52.6391C77.2742 52.6391 70.9815 46.6823 70.9815 38.5372C70.9815 30.5136 77.2742 24.5568 85.4547 24.5568ZM85.4547 62.6077C90.8664 62.6077 96.1522 60.9058 99.9278 57.8666V62.6077H110.625V37.5646C110.625 24.9215 100.054 14.5881 86.8391 14.5881H85.4547C71.3591 14.5881 60.0322 25.1646 60.0322 38.5372C60.0322 51.9097 71.3591 62.6077 85.4547 62.6077Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M25.5483 52.6391C17.4937 52.6391 11.0751 46.3175 11.0751 38.6587C11.0751 30.5136 17.3678 24.5567 25.5483 24.5567C33.7288 24.5567 40.0215 30.5136 40.0215 38.6587C40.0215 46.6822 33.7288 52.6391 25.5483 52.6391ZM25.5483 14.5881C20.1366 14.5881 14.8507 16.2901 11.0751 19.3293V1.09399H0.377563V39.5097C0.377563 52.1528 10.9493 62.4862 24.1639 62.4862H25.5483C39.6439 62.4862 50.9707 51.9097 50.9707 38.5371C50.8449 25.2862 39.6439 14.5881 25.5483 14.5881Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M164.617 62.6077V53.2469H136.048L164.617 24.0704V14.7097H121.071V24.0704H150.018L121.323 53.2469V62.6077H164.617Z" />
    </svg>
  );
};

export default IconLogo;