// Dependencies
import React, { useState } from "react";

// Components
import { Col, Container, Row } from "react-bootstrap";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import Button from "../../../common/components/button";
import { EBtnVisibleType } from "../../../common/components/button/interfaces";
import { ELarge } from "../../../common/interfaces";

const PaymentSummary: React.FC<any> = () => {
  const [approved, setApproved] = useState(false);
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
              <span>T982JMASR</span>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Date</span>
              <span>2 Oct, 2022</span>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Exchange rate</span>
              <span>1 BNB : 3.320 USD</span>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Value x kg</span>
              <span>1,40 kg</span>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Amount</span>
              <span>1000 kg</span>
            </div>
            <div className="payment-summary--content-right--details--item">
              <span>Service fee</span>
              <span>140.0</span>
            </div>
            <div className="payment-summary--content-right--details--item total">
              <span>Total to pay in BNB</span>
              <span>0.012312 BNB</span>
            </div>
            <div className="payment-summary--content-right--details--item total">
              <span>Total to pay in USD</span>
              <span>140.140 USD</span>
            </div>
          </div>
          <div className="payment-summary--content-right--footer">
            <Button visibleType={ EBtnVisibleType.clear } large={ ELarge.full } type="button">Back page</Button>
            <Button visibleType={ EBtnVisibleType.solid } large={ ELarge.full } type="button" onClick={ () => { setApproved(!approved); } }>
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
