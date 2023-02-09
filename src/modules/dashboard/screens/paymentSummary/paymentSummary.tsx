// Dependencies
import React, { useState } from "react";

// Components
import { Col, Container, Row } from "react-bootstrap";
import { BsWhatsapp } from "react-icons/bs";
import { MdOpenInNew, MdOutlineFileDownload } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import Button from "../../../common/components/button";
import { EBtnVisibleType } from "../../../common/components/button/interfaces";
import { ELarge } from "../../../common/interfaces";
import { SERVICE_FEE } from "../productDetails/utils";

const PaymentSummary: React.FC<any> = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    status,
    orderCode,
    totalBnb,
    valueXKg,
    amount,
    date,
  } = state;

  const approved = status === 1;
  const subTotalUsd = amount * valueXKg;
  const serviceFee = subTotalUsd * SERVICE_FEE;
  const totalUsd = subTotalUsd + serviceFee;
  const exchangeRate = totalUsd / totalBnb;

  return (
    <Container fluid className="payment-summary">
      <Row className="payment-summary--row">
        <Col md={ 5 } className="payment-summary--banner-left">
          { approved ?
            (
              <img className="img-left" src="/assets/images/banner-transaction-approved.png" alt="bazar" />
            ) :
            (
              <img className="img-left" src="/assets/images/banner-transaction-rejected.png" alt="bazar" />
            ) }
        </Col>
        <Col md={ { span: 5, offset: 1 } } className="payment-summary--content-right">
          <div className="payment-summary--content-right--header">
            <div className="payment-summary--content-right--header--title">
              <h1>Payment summary</h1>
            </div>
            <div className="payment-summary--content-right--header--subtitle">
              { approved ?
                (
                  <span>
                    Hi <strong>user</strong>, your payment has been confirmed.
                  </span>)
                :
                (
                  <span>
                    Hi <strong>user</strong>, sorry your payment could not be validated, please try again.
                  </span>
                )
              }

              <MdOutlineFileDownload className="download-icon" />
            </div>
          </div>
          <div className="payment-summary--content-right--details">
            <div className="payment-summary--content-right--details--item">
              <span>Payment method</span>
              <span>Wallet</span>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Status</span>
              <span className={ `${ approved ? "accepted" : "rejected" }` }>{ approved ? ("Accepted") : ("Rejected") }</span>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Order code</span>
              <a href={ `https://testnet.bscscan.com/tx/${ orderCode }` } target='_blank' className="textPrimary200 textLink">
                { orderCode.substring(0, 5) }.....{ orderCode.substring(orderCode.length - 5, orderCode.length) }<div className="horizontalSpaceS" /><MdOpenInNew></MdOpenInNew>
              </a>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Date</span>
              <span>{ date }</span>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Exchange rate</span>
              <span>1 BNB : { exchangeRate.toFixed(2) } USD</span>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Value x kg</span>
              <span>{ valueXKg } USD</span>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Amount</span>
              <span>{ amount } kg</span>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Service fee</span>
              <span>{ serviceFee.toFixed(2) } USD</span>
            </div>
            <div className="payment-summary--content-right--details--item total">
              <span>Total to pay in BNB</span>
              <span>{ totalBnb.toFixed(4) } BNB</span>
            </div>
            <div className="payment-summary--content-right--details--item total">
              <span>Total to pay in USD</span>
              <span>{ totalUsd.toFixed(2) } USD</span>
            </div>
          </div>
          <div className="payment-summary--content-right--footer">
            <Button visibleType={ EBtnVisibleType.clear } large={ ELarge.full } type="button" onClick={ () => { navigate('../product-list'); } }>Back page</Button>
            <Button visibleType={ EBtnVisibleType.solid } large={ ELarge.full } type="button" onClick={ () => { } }>
              { approved ?
                (
                  <>
                    <BsWhatsapp className="whatsapp-icon" />
                    Contact Seller
                  </>
                ) : 'Try again' }
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSummary;
