import React from "react";
import type { IModalProps } from "./interfaces";
import Button from "../button";
import { EBtnVisibleType } from "../button/interfaces";


const Modal: React.FC<IModalProps> = (props) => {
  const {
    title,
    width,
    height,
    closed,
    children,
    continueDisabled,
    maxHeight, 
    maxWidth,
    onClose,
    onContinue,
    cancelHidden,
  } = props;

  if (closed) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" style={{width, height, maxHeight, maxWidth}}>
        <div className="modal-title">
          {title}
        </div>
        <div className="modal-body">
          { children }
        </div>
        <div className="modal-footer">
          {!cancelHidden && (
            <Button visibleType={EBtnVisibleType.clear} type="button" onClick={(event) => onClose(event)}>Cancel</Button>
          )}
          <Button disabled={continueDisabled} type="button" onClick={(event) => onContinue(event)}>Continue</Button>
        </div>
      </div>
    </div> 
  );
};

export default Modal;
