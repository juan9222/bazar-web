import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { BsCheckSquare, BsSquare } from "react-icons/bs";
import Button from "../../../../../common/components/button";

const ModalConfirmPurchase: React.FC<any> = (props) => {

  const [check, setCheck] = useState(false);

  return (
    <Modal
      { ...props }
      size="lg"
      aria-labelledby="pd-modal-confirmPurchase-title-vcenter"
      className="pd-modal-confirmPurchase"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="pd-modal-confirmPurchase-title-vcenter">
          <h4>Confirm purchase</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pd-modal-confirmPurchase--body">
        <div className="pd-modal-confirmPurchase--body--products">
          <div className="pd-modal-confirmPurchase--body--products--item">
            <div className="pd-modal-confirmPurchase--body--products--item-description">
              <div className="pd-modal-confirmPurchase--body--products--item-description--frame">
                <img className="pd-modal-confirmPurchase--body--products--item-description--frame--img" src={ "/assets/images/product-1.jpg" } alt="product" />
              </div>
              <div className="pd-modal-confirmPurchase--body--products--item-description--detail">
                <div className="pd-modal-confirmPurchase--body--products--item-description--detail--text">
                  <img className="icon" src={ "/assets/images/icon-coffebeans.png" } alt="product" />
                  <span>Coffee</span>
                  <img className="icon" src={ "/assets/images/icon-certificatesustainability.png" } alt="product" />
                </div>
                <div className="pd-modal-confirmPurchase--body--products--item-description--detail--type">
                  <span>Beans rosted | Arabica coffee</span>
                </div>
              </div>
            </div>
            <div className="pd-modal-confirmPurchase--body--products--item-qty">
              <div className="pd-modal-confirmPurchase--body--products--item-qty--section">
                <span className="pd-money">1.50 USD</span><span className="pd-unit">/kg</span>
              </div>
              <div className="pd-modal-confirmPurchase--body--products--item-qty--section totalAvailable">
                <span className="qtyAvailable">1000 kg</span>
                <span className="avaliable">Available</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pd-modal-confirmPurchase--body--paymentDetail">
          <div className="pd-modal-confirmPurchase--body--paymentDetail--title">
            <span>Payment detail</span>
          </div>
          <div className="pd-modal-confirmPurchase--body--paymentDetail--details">
            <div className="pd-modal-confirmPurchase--body--paymentDetail--details--item"><span>Amount</span><span>1000 kg</span></div>
            <div className="pd-modal-confirmPurchase--body--paymentDetail--details--item"><span>Total product</span><span>140.000 USD</span></div>
            <div className="pd-modal-confirmPurchase--body--paymentDetail--details--item"><span>Service fee</span><span>140.0</span></div>
          </div>
          <div className="pd-modal-confirmPurchase--body--paymentDetail--total">
            <div><span>Total to pay</span></div>
            <div className="totalValue"><span>467,94 BNB</span><span className="secondary">140.140 USD</span></div>
          </div>
          <div className="pd-modal-confirmPurchase--body--paymentDetail--note"><span>BNB's exchange rate will be updated at : 20 s</span></div>
        </div>
        <div className="pd-modal-confirmPurchase--body--action">
          <div className="termsAndService" onClick={ () => setCheck(!check) }>
            { check ? (
              <BsCheckSquare className="check" />
            ) : (
              <BsSquare className="check" />
            )
            }
            <span>By checking this box, I agree to Bazar's <strong>terms of service</strong></span>
          </div>
          <div className="confirm">
            <Button className="btn-confirm" onClick={ props.confirm }>Confirm</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConfirmPurchase;
