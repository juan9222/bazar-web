import React from 'react';
import { IHeroAuthProps } from './interfaces';
const HeroAuth: React.FC<IHeroAuthProps> = (props) => {
  const { title, subtitle } = props;
  return (
    <div className="titleAndSubTitle">
      <h1 className="titleAndSubTitle__title">{ title }</h1>
      <h2 className="titleAndSubTitle__subtitle">{ subtitle }</h2>
    </div>
  );
};

export default HeroAuth;