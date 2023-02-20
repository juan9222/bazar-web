// Dependencies
import React from "react";
import { useLocation } from "react-router-dom";
import useTransactionStarted from "./hooks/useTransactionStarted";

const TransactionStarted: React.FC<any> = () => {

  const { } = useTransactionStarted();
  // const { setResultBinanceTx, setProductId, setQuantityToBuy } = useTransactionStarted();

  // const location = useLocation();
  // setResultBinanceTx(location.state.resultBinanceTx);
  // setProductId(location.state.productId);
  // setQuantityToBuy(location.state.quantityToBuy);

  return (
    <div className="trs-transaction">
      <div className="trs-transaction--container">
        <div className="trs-transaction--container--title">
          <span>
            Your transaction has started
          </span>
        </div>
        <div className="trs-transaction--container--logo">
          <img src={ "/assets/images/LogoBazarWhite.png" } alt="Bazar" className="logoBazarWhite" />
          <img src={ "/assets/images/LogoBazarBlue.png" } alt="Bazar" className="logoBazarBlue" />
        </div>
        <div className="trs-transaction--container--subtitle">
          <span>The Binance network is processing you transaction, which can take a little while.</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionStarted;
