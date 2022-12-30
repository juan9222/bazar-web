// Dependencies
import React, { useState } from "react";
import ImageGallery from 'react-image-gallery';

// Components
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../../common/components/button";

// Icons
import { MdArrowBackIos, MdLocationOn, MdCalendarToday } from 'react-icons/md';
import { GiCoffeeBeans, GiLeafSwirl } from 'react-icons/gi';
import { TbPaperBag } from 'react-icons/tb';
import { HiPencil } from 'react-icons/hi';
import InputText from "../../../common/components/inputText";
import Select from "../../../common/components/select";
import ModalConfirmPurchase from "./components/modalConfirmPurchase";
import ModalConfirmBlock from "./components/modalConfirmBlock";

const ProductDetailsBuyer: React.FC<any> = () => {
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

  const incoterms = [
    {
      label: 'FOB',
      value: 'fob'
    }
  ];

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmBlockModal, setShowConfirmBlockModal] = useState(false);

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
                  <span className="status-product status-public">Public</span>
                </div>
                <p>Cafeto Software</p>
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
          <div></div>
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
        <Col className="pd__col-buy" md={ 5 }>
          <Row>
            <Col md={ 6 }>
              <InputText
                required
                name={ 'name' }
                label={ "Quantity to buy /Kg" }
                type={ "number" }
                placeholder={ "1000" }
                autoComplete={ "off" } />
            </Col>
            <Col md={ 6 }>
              <Select
                selection={ "" }
                onChangeSelection={ () => { } }
                label={ "Select INCOTERMS" }
                name={ 'INCOTERMS' }
                placeholder={ "Select option" }
                options={ incoterms }
                required />
            </Col>
          </Row>
          <Button className="btn-buy" onClick={ () => setShowConfirmModal(!showConfirmModal) }>Buy now</Button>
        </Col>
      </Row>
      <div className="pd__col-certificate">
        <img className="pd__col-certificate--image" src={ "/assets/images/certifications/iso-1401.png" } alt="ISO 1401" />
        <img className="pd__col-certificate--image" src={ "/assets/images/certifications/global-gap.png" } alt="Global Gap" />
        <img className="pd__col-certificate--image" src={ "/assets/images/certifications/ecook-2022.png" } alt="ECO OK 2022" />
      </div>
      <ModalConfirmPurchase show={ showConfirmModal } onHide={ () => setShowConfirmModal(!showConfirmModal) } confirm={ () => { setShowConfirmBlockModal(!showConfirmBlockModal); setShowConfirmModal(!showConfirmModal); } } />
      <ModalConfirmBlock show={ showConfirmBlockModal } onHide={ () => setShowConfirmBlockModal(!showConfirmBlockModal) } />
    </Container >
  );
};

export default ProductDetailsBuyer;
