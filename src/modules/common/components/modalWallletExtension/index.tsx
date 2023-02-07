import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../button";
import { EBtnVisibleType } from "../button/interfaces";

const ModalWallletExtension: React.FC<any> = (props) => {

  const { show, toggle, ...rest } = props;

  const redirect = () => {
    window.open("https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp", "_blank");
  };

  return (
    <Modal
      { ...rest }
      show={ show }
      size="lg"
      aria-labelledby="mn-modal-enableWalletExtension-title-vcenter"
      className="mn-modal-enableWalletExtension"
      centered
    >
      <Modal.Header>
        <Modal.Title id="mn-modal-enableWalletExtension-title-vcenter">
          <h4>Ups, we are sorry !</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mn-modal-enableWalletExtension--body">
        <p>We have noticed that you do not have the wallet extension in your browser, please intall and try again.</p>
        <div className="buttons">
          <Button visibleType={ EBtnVisibleType.clear } type="button" onClick={ toggle }>Cancel</Button>
          <Button visibleType={ EBtnVisibleType.solid } type="button" onClick={ redirect }>Install wallet</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalWallletExtension;