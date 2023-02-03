// Dependencies
import React, { useState } from "react";
import ImageGallery from 'react-image-gallery';

// Components
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../../common/components/button";

// Icons
import { MdArrowBackIos, MdEdit, MdCancel, MdDelete, MdLocationOn, MdCalendarToday, MdQrCode2 } from 'react-icons/md';
import { GiLeafSwirl } from 'react-icons/gi';
import { TbDots } from 'react-icons/tb';
import { HiPencil } from 'react-icons/hi';
import useProductDetails from "./hooks/useProductDetails";
import { getOptionIconLabel, getProductIcon } from "../../../common/components/productIcon";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../common/components/modal";
import InputText from "../../../common/components/inputText";
import { ELarge } from "../../../common/interfaces";
import { isBuyer, isSeller } from "../../layouts/dashboardLayout/utils";
import Select from "../../../common/components/select";
import ModalConfirmPurchaseNew from "./components/modalConfirmPurchase";
import ModalConfirmBlockNew from "./components/modalConfirmBlock";
import { getStatusTag } from "../../../common/components/statusTag/statusTag";
import { getMappedStatus } from "../productList/utils";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Status } from "../../../common/components/card/interfaces";

const ProductDetails: React.FC<any> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { product,
    incotermOptions,
    quantityToBuy,
    showEditAvailability,
    onChangeEditAvailabilityDisplay,
    register,
    hasErrorsInput,
    getMessageErrorInput,
    handleSubmit,
    submitAvailableAssets,
    savingAvailability,
    onPublish,
    onHide,
    showConnectWalletDialog,
    setShowConnectWalletDialog,
    showPublishDialog,
    setShowPublishDialog,
    publishProduct,
    showConfirmModal,
    setShowConfirmModal,
    showConfirmBlockModal,
    setShowConfirmBlockModal,
    onConfirmBuy,
  } = useProductDetails();

  const images = product?.url_images ? product.url_images.map((image: string) => {
    return {
      original: image,
      thumbnail: image,
      originalHeight: 410,
      thumbnailWidth: 72,
      thumbnailHeight: 72,
    };
  }) : [];

  const previousUrl = location.state.previousUrl;

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
            <ImageGallery items={ images } thumbnailPosition={ "left" } showFullscreenButton={ false } showIndex={ true }
              showPlayButton={ false } />
          </div>
        </Col>
        <Col md={ 5 } className="pd__col-details">
          <div className="pd__col-details__user">
            <div className="details-user-content">
              <MdArrowBackIos className="pd__col-details__user--icon-left" onClick={ () => navigate(previousUrl) } />
              <img className="pd__col-details__user--img" src={ product?.url_avatar || "/assets/images/default-avatar.png" } alt="User avatar" />
              <div className="pd__col-details__user--product">
                <div className="title">
                  <h4>{ getProductIcon(product?.basic_product) } { product?.basic_product }</h4>
                  { getStatusTag(getMappedStatus(product?.status)) }
                </div>
                <p>{ product?.company_name }</p>
              </div>
            </div>
            { !isBuyer() && (
              <div className="pd__col-details__user--options options-hover">
                <TbDots className="icon" />
                <div className="data">
                  <Button className={ 'btn-data-option' } iconLeft={ <MdEdit /> } >Edit</Button>
                  { getMappedStatus(product?.status) !== Status.public && getMappedStatus(product?.status) !== Status.review && (
                    <Button className={ 'btn-data-option' } iconLeft={ <BsFillCheckCircleFill /> } onClick={ () => onPublish() }>Publish</Button>
                  ) }
                  { getMappedStatus(product?.status) !== Status.hidden && (
                    <Button className={ 'btn-data-option' } iconLeft={ <MdCancel /> } onClick={ () => onHide() }>Hide</Button>
                  ) }
                  <Button className={ 'btn-data-option' } iconLeft={ <MdDelete /> } >Delete</Button>
                </div>
              </div>
            ) }
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
              <span className="list__item--value">{ incotermOptions && incotermOptions.map(option => option.label).join(' - ') }</span>
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
              <span className="list__item--label">Assets Available { isSeller() && <HiPencil onClick={ onChangeEditAvailabilityDisplay } /> }</span>
              <span className="list__item--value">{ product?.available_for_sale } Kg</span>
            </div>
            <div className="list__item">
              <span className="list__item--label">Minimun order</span>
              <span className="list__item--value">{ getOptionIconLabel('minimumOrder', product?.minimum_order) }</span>
            </div>
          </div>
        </Col>
        { isSeller() && (
          <Col className="pd__col-logic-quotes" md={ 5 }>
            <Button className={ 'btn-logic-quotes' } >Obtain logistics quotes</Button>
            <Button className={ 'btn-qr qr-mobile' }>
              <MdQrCode2 />
              QR code
            </Button>
          </Col>
        ) }
        { isBuyer() && (
          <Col className="pd__col-buy" md={ 5 }>
            <Row>
              <Col md={ 6 }>
                <InputText
                  register={ register }
                  name={ "quantity" }
                  label={ "Quantity to buy /Kg" }
                  type={ "number" }
                  hasError={ hasErrorsInput("quantity") }
                  errorMessage={ getMessageErrorInput("quantity") }
                  placeholder={ "1000" }
                  autoComplete={ "off" }
                  required />
              </Col>
              <Col md={ 6 }>
                <Select
                  selection={ "" }
                  onChangeSelection={ () => { } }
                  label={ "Select INCOTERMS" }
                  name={ 'INCOTERMS' }
                  placeholder={ "Select option" }
                  options={ incotermOptions ?? [] }
                  required />
              </Col>
            </Row>
            <Button className="btn-buy" onClick={ () => setShowConfirmModal(!showConfirmModal) } disabled={ !quantityToBuy || hasErrorsInput("quantity") }>Buy now</Button>
          </Col>
        ) }
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
          <Button large={ ELarge.full } type="button" onClick={ handleSubmit(submitAvailableAssets, () => alert('Dani hizo fallar esto')) } disabled={ savingAvailability }>{ savingAvailability ? 'Saving...' : 'Save' }</Button>
          <div className="verticalSpaceS" />
          <p className="pd-custom-modal-footer">This field will edit the availability of your product.</p>
        </form>
      </Modal>
      <Modal title="" continueText='Continue' width='560px' closed={ !showPublishDialog } showCloseIcon={ false } onClose={ () => setShowPublishDialog(false) } onContinue={ () => publishProduct() }>
        <div className="verticalSpaceS"></div>
        <h3 className='textPrimary300 textModalTitle'>Are you sure you want to public this product?</h3>
        <div className="verticalSpaceL"></div>
        <p className='textModalDesc'>Once your products are published you will be accepting our terms of service and these will be visible to buyers.</p>
      </Modal>
      <Modal title="" continueText='Continue' width='560px' closed={ !showConnectWalletDialog } showCloseIcon={ false } cancelHidden={ true } onClose={ () => setShowConnectWalletDialog(false) } onContinue={ () => setShowConnectWalletDialog(false) }>
        <div className="verticalSpaceS"></div>
        <h3 className='textPrimary300 textModalTitle'>We are sorry...</h3>
        <div className="verticalSpaceL"></div>
        <p className='textModalDesc'>You need to connect the wallet to be able to publish the product and sign the contract.</p>
      </Modal>
      <ModalConfirmPurchaseNew
        product={ product }
        quantity={ quantityToBuy }
        initialTimer={ 20 }
        show={ showConfirmModal }
        fetchExchange={ () => { } } //TODO pass function to refetch BNP value
        onHide={ () => setShowConfirmModal(!showConfirmModal) }
        confirm={ () => onConfirmBuy() } />
      <ModalConfirmBlockNew show={ showConfirmBlockModal } onHide={ () => setShowConfirmBlockModal(!showConfirmBlockModal) } />
    </Container >
  );
};

export default ProductDetails;
