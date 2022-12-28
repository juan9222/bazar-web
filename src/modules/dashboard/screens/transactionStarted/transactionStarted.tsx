// Dependencies
import React from "react";


const TransactionStarted: React.FC<any> = () => {

  return (
    <div className="trs-transaction">
      <div className="trs-transaction--container">
        <div className="trs-transaction--container--title">
          <span>
            Your transaction has started
          </span>
        </div>
        <div className="trs-transaction--container--logo">
          <img src={ "/assets/images/logoBazarWhite.png" } alt="Bazar" className="logoBazarWhite" />
          <img src={ "/assets/images/logoBazarBlue.png" } alt="Bazar" className="logoBazarBlue" />
        </div>
        <div className="trs-transaction--container--subtitle">
          <span>The Binance network is processing you transaction, which can take a little while.</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionStarted;
