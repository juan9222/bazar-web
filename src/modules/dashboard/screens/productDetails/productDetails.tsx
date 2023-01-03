// Dependencies
import React from "react";
import ImageGallery from 'react-image-gallery';

// Components
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../../common/components/button";

// Icons
import { MdArrowBackIos, MdEdit, MdCancel, MdDelete, MdLocationOn, MdCalendarToday, MdQrCode2 } from 'react-icons/md';
import { GiLeafSwirl } from 'react-icons/gi';
import { TbDots, TbPaperBag } from 'react-icons/tb';
import { HiPencil } from 'react-icons/hi';
import useProductDetails from "./hooks/useProductDetails";
import { useUser } from "../../layouts/dashboardLayout/dashboardLayout";
import { getOptionIconLabel, getProductIcon } from "../../../common/components/productIcon";
import { useNavigate } from "react-router-dom";
import Modal from "../../../common/components/modal";
import InputText from "../../../common/components/inputText";
import { ELarge } from "../../../common/interfaces";

const ProductDetails: React.FC<any> = () => {
  const navigate = useNavigate();

  const { product, showEditAvailability, onChangeEditAvailabilityDisplay, register, hasErrorsInput, getMessageErrorInput, handleSubmit, submitForm, savingAvailability, } = useProductDetails();

  const images = product?.url_images ? product.url_images.map((image: string) => {
    return {
      original: image,
      thumbnail: image,
      originalHeight: 400,
      thumbnailWidth: 90,
      thumbnailHeight: 90,
    };
  }) : [];

  const { authenticatedUser } = useUser();

  const getCertificateImage = (certificate: string) => {
    switch (certificate) {
      case "ISO 14001":
        return "/assets/images/certifications/iso-1401.png";
      case "ECO-OK":
        return "/assets/images/certifications/ecook-2022.png";
      case "Global GAP":
        return "/assets/images/certifications/global-gap.png";
      case "SA8000":
        return "/assets/images/certifications/sa8000.png";
      case "EUREPGAP":
        return "/assets/images/certifications/eurepgap.png";
      case "SAI-Platform":
        return "/assets/images/certifications/saiplatform.png";
      case "Rainforest Alliance":
        return "/assets/images/certifications/rainforest.png";
      case "HACCP":
        return "/assets/images/certifications/haccp.png";
      case "SASA - Platform":
        return "/assets/images/certifications/sasaPlatform.png";
      case "BASC":
        return "/assets/images/certifications/basc.png";
      case "COLEACP":
        return "/assets/images/certifications/coleacp.png";
      case "ICA BPA":
        return "/assets/images/certifications/icaBPA.png";
      default:
        return "";
    }
  };

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
              <MdArrowBackIos className="pd__col-details__user--icon-left" onClick={ () => navigate("/dashboard/product-list") } />
              <img className="pd__col-details__user--img" src={ authenticatedUser?.profileImage || "/assets/images/default-avatar.png" } alt="User avatar" />
              <div className="pd__col-details__user--product">
                <div className="title">
                  <h4>{ getProductIcon(product?.basic_product) } { product?.basic_product }</h4>
                  <span className="status-product status-review">{ product?.status }</span>
                </div>
                <p>{ authenticatedUser?.company }</p>
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
              <p className="details__price">{ product?.expected_price_per_kg } USD <span>/ kg</span></p>
            </div>
            <p className="details__description">
              { product?.additional_description }
            </p>
          </div>
          <div className="pd__col-details__list">
            <div className="list__item">
              <span className="list__item--label">Product type</span>
              <span className="list__item--value">{ product?.product_type }</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">Varieties</span>
              <span className="list__item--value"><GiLeafSwirl /> { product?.variety }</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">Port ETA</span>
              <span className="list__item--value"><MdCalendarToday /> { product?.date_in_port }</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">Guild or association</span>
              <span className="list__item--value">{ product?.guild_or_association }</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">INCOTERMS</span>
              <span className="list__item--value">{ product?.incoterms.map((incoterm: { incoterm: string, }) => {
                const inco = incoterm.incoterm.match(/\((.*?)\)/);
                return inco !== null ? inco[1] : '';
              }).join(' - ') }</span>
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
              <span className="list__item--value">{ product?.capacity_per_year } Kg</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">Assets Avaliable <HiPencil onClick={ onChangeEditAvailabilityDisplay } /></span>
              <span className="list__item--value">{ product?.available_for_sale } Kg</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">Minimun order</span>
              <span className="list__item--value">{ getOptionIconLabel('minimumOrder', product?.minimum_order) }</span>
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
        { product?.sustainability_certifications.map((certificate: { uuid: string, certification: string; }) =>
          <img className="pd__col-certificate--image" src={ getCertificateImage(certificate.certification) } alt={ certificate.certification } />
        ) }
      </div>
      <Modal title="Edit availability" hideFooter width='560px' closed={ !showEditAvailability } showCloseIcon={ true } onClose={ onChangeEditAvailabilityDisplay } >
        <div className="verticalSpaceS" />
        <form>
          <InputText
            register={ register }
            name={ "availability" }
            label={ "How much do you have available for sale? (kg)" }
            type={ "number" }
            hasError={ hasErrorsInput("availability") }
            errorMessage={ getMessageErrorInput("availability") }
            placeholder={ "E.g 1.800" }
            required />
          <Button large={ ELarge.full } type="button" onClick={ handleSubmit(submitForm) } disabled={ savingAvailability }>{ savingAvailability ? 'Saving...' : 'Save' }</Button>
          <div className="verticalSpaceS" />
          <p className="pd-custom-modal-footer">This field will edit the availability of your product.</p>
        </form>
      </Modal>
    </Container >
  );
};

export default ProductDetails;
