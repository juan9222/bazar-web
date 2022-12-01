import React from "react";
import { TbDots } from 'react-icons/tb';
import { MdEdit, MdCancel, MdDelete } from 'react-icons/md';
import Button from "../button";
import IconCertificate from "../../../../assets/svg/icons/iconCertificate";

const Card: React.FC<any> = (props) => {
  const { icon } = props;
  return (
    <div className="content-card">
      <div className="content-card__header">
        <span className="header-status status-public">Public</span>
        <span className="header-status status-review">Review</span>
        <span className="header-status status-hidden">Hidden</span>
        <img src="/assets/images/product-coffe.jpg" alt="card product" />
        <div className="header-data">
          <img className="header-data__img" src="/assets/images/default-avatar.png" alt="card product" />
          <div className="header-data__title">
            <h4>
              { icon } Coffe 
              <div className="message">
                <IconCertificate className="icon-certificate" />
                <span className="message__info">This product has sustainability certificates</span>
              </div>
            </h4>
            <span>Beans rosted | Colombia</span>
          </div>
          <div className="header-data__options options-hover">
            <TbDots className="icon" />
            <div className="data">
              <Button className={ 'btn-data-option' } iconLeft={ <MdEdit /> } >Edit</Button>
              <Button className={ 'btn-data-option' } iconLeft={ <MdCancel /> } >Hide</Button>
              <Button className={ 'btn-data-option' } iconLeft={ <MdDelete /> } >Delete</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="content-card__body">
        <div className="left-data">
          <p className="left-data__first">1,50 USD <span>/ kg</span></p>
          <p className="left-data__second">1,94 / on the market</p>
        </div>
        <div className="right-data">
          <p className="right-data__first">3000<span>/kg</span></p>
          <p className="right-data__second">Available</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
