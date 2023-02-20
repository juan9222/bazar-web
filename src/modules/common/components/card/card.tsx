import React from "react";
import { TbDots } from 'react-icons/tb';
import { MdEdit, MdCancel, MdDelete } from 'react-icons/md';
import Button from "../button";
import IconCertificate from "../../../../assets/svg/icons/iconCertificate";
import { ICardProps, Status } from "./interfaces";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { getStatusTag } from "../statusTag/statusTag";

const Card: React.FC<ICardProps> = (props) => {
  const { status, productImage, avatar, icon, product, hasCertificates, productType, variety, pricePerKg, availableForSale, onClick, likeable, isLiked, onLiked, onPublish, onHide } = props;

  return (
    <div className="content-card" onClick={ onClick }>
      <div className="content-card__header">
        { getStatusTag(status, true) }
        { likeable && (
          <div className="header-wishlist" onClick={ onLiked }>
            { isLiked ?
              <AiFillHeart className="header-wishlist__heart" style={ { color: '#ef4444' } } />
              : <AiOutlineHeart className="header-wishlist__heart" style={ { color: '#ffffff' } } />
            }
          </div>
        ) }
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
          { !likeable && (
            <div className="header-data__options options-hover">
              <TbDots className="icon" />
              <div className="data">
                <Button className={ 'btn-data-option' } iconLeft={ <MdEdit /> } >Edit</Button>
                { status !== Status.public && status !== Status.review && (
                  <Button className={ 'btn-data-option' } iconLeft={ <BsFillCheckCircleFill /> } onClick={ (e) => onPublish! }>Publish</Button>
                ) }
                { status !== Status.hidden && (
                  <Button className={ 'btn-data-option' } iconLeft={ <MdCancel /> } onClick={ (e) => onHide! }>Hide</Button>
                ) }
                <Button className={ 'btn-data-option' } iconLeft={ <MdDelete /> } >Delete</Button>
              </div>
            </div>
          ) }
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
