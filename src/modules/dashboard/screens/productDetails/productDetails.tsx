// Dependencies
import React from "react";
import ImageGallery from 'react-image-gallery';

// Components
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../../common/components/button";

// Icons
import { MdArrowBackIos, MdEdit, MdCancel, MdDelete, MdLocationOn, MdCalendarToday, MdQrCode2 } from 'react-icons/md';
import { GiCoffeeBeans, GiLeafSwirl } from 'react-icons/gi';
import { TbDots, TbPaperBag } from 'react-icons/tb';
import { HiPencil } from 'react-icons/hi';

const ProductDetails: React.FC<any> = () => {
  const images = [
    {
      original: '/assets/images/product-1.jpg',
      thumbnail: '/assets/images/product-1.jpg',
      originalHeight: 400,
      thumbnailWidth: 90,
      thumbnailHeight: 90,
    },
    {
      original: '/assets/images/product-2.jpg',
      thumbnail: '/assets/images/product-2.jpg',
      originalHeight: 400,
      thumbnailWidth: 90,
      thumbnailHeight: 90,
    },
    {
      original: '/assets/images/product-3.jpg',
      thumbnail: '/assets/images/product-3.jpg',
      originalHeight: 400,
      thumbnailWidth: 90,
      thumbnailHeight: 90,
    },
    {
      original: '/assets/images/product-4.jpg',
      thumbnail: '/assets/images/product-4.jpg',
      originalHeight: 400,
      thumbnailWidth: 90,
      thumbnailHeight: 90,
    },
    {
      original: '/assets/images/product-5.jpg',
      thumbnail: '/assets/images/product-5.jpg',
      originalHeight: 400,
      thumbnailWidth: 90,
      thumbnailHeight: 90,
    },
  ];

  return (
    <Container fluid className="pd">
      <Row>
        <Col md={ 7 } className="pd__col-gallery">
          <div className="pd__col-gallery__content">
            <ImageGallery items={ images } thumbnailPosition={ "left" } showFullscreenButton={ false }
              showPlayButton={ false } />
          </div>
        </Col>
        <Col md={ 5 } className="pd__col-details">
          <div className="pd__col-details__user">
            <div className="details-user-content">
              <MdArrowBackIos className="pd__col-details__user--icon-left" />
              <img className="pd__col-details__user--img" src={ "/assets/images/default-avatar.png" } alt="User avatar" />
              <div className="pd__col-details__user--product">
                <div className="title">
                  <h4><GiCoffeeBeans /> Coffee</h4>
                  <span className="status-product status-review">Review</span>
                </div>
                <p>Cafeto Software</p>
              </div>
            </div>
            <div className="pd__col-details__user--options options-hover">
              <TbDots className="icon" />
              <div className="data">
                <Button className={ 'btn-data-option' } iconLeft={ <MdEdit /> } >Edit</Button>
                <Button className={ 'btn-data-option' } iconLeft={ <MdCancel /> } >Hide</Button>
                <Button className={ 'btn-data-option' } iconLeft={ <MdDelete /> } >Delete</Button>
              </div>
            </div>
          </div>
          <div className="pd__col-details__location-price">
            <div className="details">
              <p className="details__location"><MdLocationOn /> Cali, Colombia</p>
              <p className="details__price">1,50 USD <span>/ kg</span></p>
            </div>
            <p className="details__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.
            </p>
          </div>
          <div className="pd__col-details__list">
            <div className="list__item">
              <span className="list__item--label">Product type</span>
              <span className="list__item--value">Beans rosted</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">Varieties</span>
              <span className="list__item--value"><GiLeafSwirl /> Arabica Coffe</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">Port ETA</span>
              <span className="list__item--value"><MdCalendarToday /> 29 Sep, 2022</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">Guild or association</span>
              <span className="list__item--value">Federacion de cafeteros</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">INCOTERMS</span>
              <span className="list__item--value">FOB - DAP</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={ 7 } className="pd__col-qr-details">
          <Button className={ 'btn-qr qr-desktop' }>
            <MdQrCode2 />
            QR code
          </Button>
          <div className="product-details-list">
            <div className="list__item">
              <span className="list__item--label">Capacity per year</span>
              <span className="list__item--value">1800 Kg</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">Assets Avaliable <HiPencil /></span>
              <span className="list__item--value">1000 Kg</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">Minimun order</span>
              <span className="list__item--value"><TbPaperBag /> Bags (DHL)</span>
            </div>
          </div>
        </Col>
        <Col className="pd__col-logic-quotes" md={ 5 }>
          <Button className={ 'btn-logic-quotes' } >Obtain logistics quotes</Button>
          <Button className={ 'btn-qr qr-mobile' }>
            <MdQrCode2 />
            QR code
          </Button>
        </Col>
      </Row>
      <div className="pd__col-certificate">
        <img className="pd__col-certificate--image" src={ "/assets/images/iso-1401.png" } alt="ISO 1401" />
        <img className="pd__col-certificate--image" src={ "/assets/images/global-gap.png" } alt="Global Gap" />
        <img className="pd__col-certificate--image" src={ "/assets/images/ecook-2022.png" } alt="ECO OK 2022" />
      </div>
    </Container >
  );
};

export default ProductDetails;
