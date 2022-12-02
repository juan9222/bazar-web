import React from "react";
import { TbDots } from 'react-icons/tb';
import { MdEdit, MdCancel, MdDelete } from 'react-icons/md';
import Button from "../button";
import IconCertificate from "../../../../assets/svg/icons/iconCertificate";
import { ICardProps, Status } from "./interfaces";

const Card: React.FC<ICardProps> = (props) => {
  const { status, productImage, avatar, icon, product, hasCertificates, productType, variety, pricePerKg, availableForSale } = props;

  const getStatus = (status: string) => {
    switch (status) {
      case Status.public:
        return <span className="header-status status-public">Public</span>;
      case Status.review:
        return <span className="header-status status-review">Review</span>;
      case Status.hidden:
        return <span className="header-status status-hidden">Hidden</span>;
      case Status.rejected:
        return <span className="header-status status-rejected">Rejected</span>;
    }
  };

  return (
    <div className="content-card">
      <div className="content-card__header">
        { getStatus(status) }
        <img src={ productImage } alt="card product" />
        <div className="header-data">
          <img className="header-data__img" src={ avatar ?? "/assets/images/default-avatar.png" } alt="card product" />
          <div className="header-data__title">
            <h4>
              { icon } { product }
              { hasCertificates && (
                <div className="message">
                  <IconCertificate className="icon-certificate" />
                  <span className="message__info">This product has sustainability certificates</span>
                </div>
              ) }
            </h4>
            <span>{ productType } | { variety }</span>
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
          <p className="left-data__first">{ pricePerKg } USD <span>/ kg</span></p>
          <p className="left-data__second">1,94 / on the market</p>
        </div>
        <div className="right-data">
          <p className="right-data__first">{ availableForSale }<span>/kg</span></p>
          <p className="right-data__second">Available</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
