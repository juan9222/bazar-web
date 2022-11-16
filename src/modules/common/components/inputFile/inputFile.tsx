import React from 'react';
import { ELarge } from '../../interfaces';
import Button from '../button';
import { IInputFilesProps } from './interfaces';
import { EBtnVisibleType } from '../button/interfaces/index';
import { useState } from 'react';
import { AiFillFile, AiOutlineClose } from 'react-icons/ai';

const InputFile: React.FC<IInputFilesProps> = (props) => {
  const { name, register, children, hasError, errorMessage, multiple, onChangeFile, label, ...rest } = props;
  const hiddenFileInput = React.useRef<any>();

  const [fileObj, setFileObj] = useState<any>(null);

  const onChangeInputFile = (event: any) => {
    const fileObj = event.target.files && multiple ? event.target.files : event.target.files[0];
    setFileObj(fileObj);
    onChangeFile(fileObj);
  };

  const clearFileObj = () => setFileObj(null);

  return (
    <div className="">
      <label className="inputTextContainer__label" htmlFor={ name }>{ label ? <span>{ rest.required && <span className="inputTextContainer__label--required">* </span> }{ label }</span> : "" }</label>
      {
        register ? (
          <div className="inputTextContainer__input">
            <input
              { ...register(name) }
              ref={ hiddenFileInput }
              type="file"
              id={ name }
              accept={ "*" }
              onChange={ onChangeInputFile }
              { ...rest }
              multiple={ multiple }
            />
            {
              multiple ? Array.from(fileObj).map((file: any) => (
                <div className="file" >
                  <p className="file__name">{ file.name }</p>
                  <div onClick={ clearFileObj } className="file__icon">X</div>
                </div>
              )) :
                fileObj ? (
                  <div className="file">
                    <p className="file__name">{ fileObj.name }</p>
                    <div onClick={ clearFileObj } className="file__icon">X</div>
                  </div>
                ) : (
                  <Button
                    className='inputTextContainer__input--field'
                    onClick={ () => {
                      hiddenFileInput?.current && hiddenFileInput.current.click();
                    } }
                    large={ ELarge.full }
                    visibleType={ EBtnVisibleType.outline }>
                    Add document
                  </Button>

                )
            }
            { hasError && <span className="inputTextContainer__errorMessage">{ errorMessage }</span> }

          </div>
        ) : (
          <div className="inputTextContainer__input">
            <input
              name={ name }
              type="file"
              id={ name }
              ref={ hiddenFileInput }
              accept={ "*" }
              onChange={ onChangeInputFile }
              className="dNone"
              multiple={ multiple }
              { ...rest }
            />
            {
              fileObj ?
                multiple ? Array.from(fileObj).map((file: any) => (
                  <div className="file">
                    <div className="file__name">
                      <AiFillFile />
                      <p className="file__name--text textNeutral300 smallText">{ file.name }</p>
                    </div>
                    <div onClick={ clearFileObj } className="file__icon">
                      <AiOutlineClose />
                    </div>
                  </div>
                )) : (
                  <div className="file">
                    <div className="file__name">
                      <AiFillFile />
                      <p className="file__name--text textNeutral300 smallText">{ fileObj.name }</p>
                    </div>
                    <div onClick={ clearFileObj } className="file__icon">
                      <AiOutlineClose />
                    </div>
                  </div>
                ) : (
                  <Button
                    className='inputTextContainer__input--field'
                    onClick={ () => {
                      hiddenFileInput?.current && hiddenFileInput.current.click();
                    } }
                    large={ ELarge.full }
                    visibleType={ EBtnVisibleType.outline }>
                    Add document
                  </Button>
                )
            }
            { hasError && <span className="inputTextContainer__errorMessage">{ errorMessage }</span> }
          </div>
        )
      }
    </div>
  );
};

export default InputFile;