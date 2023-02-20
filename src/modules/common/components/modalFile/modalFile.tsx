import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { MdClose, MdPictureAsPdf } from "react-icons/md";
import Button from "../button";
import { EBtnVisibleType } from "../button/interfaces";

const ModalFile: React.FC<{
  title?: string;
  fileName?: string;
  onPressSelectDocument?: () => void;
  onClearFile?: () => void;
  hideModal?: () => void;
  setFileObj?: (file: any) => void;
  getFileSizeInMb?: (file: any) => any;
  setHasTenOrLessMb?: (bool: boolean) => void;
  hasTenOrLessMb?: boolean;

}> = (props) => {
  const {
    title,
    fileName,
    onPressSelectDocument,
    onClearFile,
    setFileObj,
    hideModal,
    setHasTenOrLessMb,
    hasTenOrLessMb,
    getFileSizeInMb,
  } = props;


  const dropHandler = (ev: any) => {
    // console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          const file = item.getAsFile();
          // console.log(`… file[${ i }].name = ${ file.name }`);
          setFileObj && setFileObj(file);
          setHasTenOrLessMb && setHasTenOrLessMb(Number(getFileSizeInMb && getFileSizeInMb(file)) < 10);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        // console.log(`… file[${ i }].name = ${ file.name }`);
      });
    }
  };
  const dragOverHandler = (ev: any) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  };
  return (
    <div className="custom-modal-overlay">
      <div className="modal-file">
        <div className="modal-file--title">
          <h3>{ title }</h3>
        </div>
        <div className="modal-file--content">
          <p className="label">This form accepts PDF, JPEG, JPG, PNG files up to 10 MB.</p>
          <div
            onClick={ () => {

              fileName === undefined && onPressSelectDocument && onPressSelectDocument();
            }
            }
            className="input"
            onDrop={ dropHandler }
            onDragOver={ dragOverHandler }>
            { fileName === undefined ? <MdPictureAsPdf className="icon-pdf" /> : hasTenOrLessMb ? <AiFillCheckCircle className="icon-check" /> : <AiFillCloseCircle className="icon-close" />
            }
            <b>
              { fileName === undefined ? "Select a document" : fileName }
              { fileName !== undefined && <MdClose onClick={ onClearFile } className="close" /> }</b>
            <p>{ hasTenOrLessMb ? fileName !== undefined ? "Document uploaded successfully" : "Or drag and drop here" : "We are sorry, please try again" }</p>
            { !hasTenOrLessMb && <p><small>{ "check the format and size of the document" }</small></p> }
          </div>
        </div>
        <div className="dFlex jcRight modal-file--footer">
          <Button visibleType={ EBtnVisibleType.clear } onClick={ () => {
            onClearFile && onClearFile();
            hideModal && hideModal();
          } } >Cancel</Button>
          <div className="horizontalSpaceM"></div>
          <Button disabled={ !hasTenOrLessMb } visibleType={ EBtnVisibleType.solid } onClick={ hideModal }>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default ModalFile;