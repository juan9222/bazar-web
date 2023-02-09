import React from "react";
import Modal from "../modal/modal";

const ModalWallletExtension: React.FC<any> = (props) => {

  const { show, toggle, ...rest } = props;

  const redirect = () => {
    window.open("https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp", "_blank");
  };

  return (
    <Modal title="" continueText='Install wallet' width='560px' closed={ !show } showCloseIcon={ false } cancelHidden={ false } onClose={ () => toggle() } onContinue={ () => redirect() }>
      <div className="verticalSpaceS"></div>
      <h3 className='textPrimary300 textModalTitle'>We are sorry...</h3>
      <div className="verticalSpaceL"></div>
      <p className='textModalDesc'>We have noticed that you do not have the wallet extension in your browser, please install and try again.</p>
    </Modal>
  );
};

export default ModalWallletExtension;