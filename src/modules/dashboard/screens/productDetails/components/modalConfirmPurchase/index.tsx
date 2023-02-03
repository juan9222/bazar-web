import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { BsCheckSquare, BsSquare } from "react-icons/bs";
import Button from "../../../../../common/components/button";
import { getProductIcon } from "../../../../../common/components/productIcon";
import usePriceFeedBSC from "../../../../../payment/hooks/usePriceFeedBSC";

const ModalConfirmPurchaseNew: React.FC<any> = (props) => {

  const { product, quantity, initialTimer, setBnbValue, ...rest } = props;
  const [check, setCheck] = useState<boolean>(false);
  const { bnbPrice, fetchBnb } = usePriceFeedBSC();

  const subTotal = quantity * product?.expected_price_per_kg;
  const fee = subTotal * 0.05;
  const total = subTotal + fee;

  let bnbusdPar: number | undefined;
  if (bnbPrice !== undefined) {
    bnbusdPar = total / bnbPrice;
  }

  const [counter, setCounter] = useState<number>(initialTimer);

  useEffect(() => {
    if (counter === 0) {
      setCounter(initialTimer);
      fetchBnb();
      setBnbValue(bnbusdPar);
    }
    const timer = setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  useEffect(() => {
    fetchBnb();
    setBnbValue(bnbusdPar);
  }, []);

  return (
    <Modal
      { ...rest }
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
                  { getProductIcon(product?.basic_product) }
                  <span>{ product?.basic_product }</span>
                  <img className="icon" src={ "/assets/images/icon-certificatesustainability.png" } alt="product" />
                </div>
                <div className="pd-modal-confirmPurchase--body--products--item-description--detail--type">
                  <span>{ product?.product_type } | { product?.variety }</span>
                </div>
              </div>
            </div>
            <div className="pd-modal-confirmPurchase--body--products--item-qty">
              <div className="pd-modal-confirmPurchase--body--products--item-qty--section">
                <span className="pd-money">{ product?.expected_price_per_kg } USD</span><span className="pd-unit">/kg</span>
              </div>
              <div className="pd-modal-confirmPurchase--body--products--item-qty--section totalAvailable">
                <span className="qtyAvailable">{ product?.available_for_sale } kg</span>
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
            <div className="pd-modal-confirmPurchase--body--paymentDetail--details--item"><span>Amount</span><span>{ quantity } kg</span></div>
            <div className="pd-modal-confirmPurchase--body--paymentDetail--details--item"><span>Total product</span><span>{ subTotal.toFixed(2) } USD</span></div>
            <div className="pd-modal-confirmPurchase--body--paymentDetail--details--item"><span>Service fee</span><span>{ fee.toFixed(2) } USD</span></div>
          </div>
          <div className="pd-modal-confirmPurchase--body--paymentDetail--total">
            <div><span>Total to pay</span></div>
            <div className="totalValue"><span>{ bnbusdPar?.toFixed(4) } BNB</span><span className="secondary">{ total.toFixed(2) } USD</span></div>
          </div>
          <div className="pd-modal-confirmPurchase--body--paymentDetail--note"><span>BNB's exchange rate will be updated at : { counter } s</span></div>
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
            <Button className="btn-confirm" onClick={ props.confirm } disabled={ !check }>Confirm</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConfirmPurchaseNew;
