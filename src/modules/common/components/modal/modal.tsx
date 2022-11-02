import React from "react";
import type { IModalProps } from "./interfaces";
import Button from "../button";
import { EBtnVisibleType } from "../button/interfaces";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";


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
    hideFooter,
    showCloseIcon,
    cancelHidden,
    continueText,
    loading,
    cancelText,
    onCancel,
  } = props;

  if (closed) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" style={ { width, height, maxHeight, maxWidth } }>
        { title && <div className="modal-title">
          <p className="modal-title-text">
            { title }
          </p>
          { showCloseIcon && < AiOutlineClose onClick={ (event) => onClose(event) } className="modal-title-icon" /> }
        </div> }
        <div className="modal-body">
          { children }
        </div>
        {
          !hideFooter &&
          <>
            <div className="modal-footer">
              { !cancelHidden && (
                <Button visibleType={ EBtnVisibleType.clear } type="button" onClick={ (event) => onClose(event) }>{ loading ? <AiOutlineLoading3Quarters className="loaderIcon" /> : cancelText ? cancelText : "Cancel" }</Button>
              ) }
              <Button disabled={ continueDisabled || loading } type="button" onClick={ (event) => onContinue && onContinue(event) }>{ loading ? <AiOutlineLoading3Quarters className="loaderIcon" /> : continueText ? continueText : "Continue" }</Button>
            </div>
          </>
        }
      </div >
    </div >
  );
};

export default Modal;
