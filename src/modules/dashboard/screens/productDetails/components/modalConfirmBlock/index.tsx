import React from "react";
import { Modal } from "react-bootstrap";

const ModalConfirmBlockNew: React.FC<any> = (props) => {

  return (
    <div>
      <Modal
        { ...props }
        size="lg"
        aria-labelledby="pd-modal-confirmBlock-title-vcenter"
        className="pd-modal-confirmBlock"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="pd-modal-confirmBlock-title-vcenter">
            <h4>Confirm purchase</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pd-modal-confirmBlock--body">
          <div className="pd-modal-confirmBlock--body--container">
            <div className="pd-modal-confirmBlock--body--container--logo">
              <img src={ "/assets/images/LogoBazarWhite.png" } alt="Bazar" className="logoBazarWhite" />
              <img src={ "/assets/images/LogoBazarBlue.png" } alt="Bazar" className="logoBazarBlue" />
            </div>
            <div className="pd-modal-confirmBlock--body--container--text">
              <span>Waiting for blockchain confirmation</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalConfirmBlockNew;
