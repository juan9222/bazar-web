import { useWeb3React } from '@web3-react/core';
import { useCallback, useRef, useState } from "react";
import { ListGroup, ListGroupItem, Overlay } from 'react-bootstrap';
import { MdAccountBalanceWallet, MdCheckCircle, MdLogout } from 'react-icons/md';
import InputText from '../../../common/components/inputText';
import useWalletConnectionBSC from "../../hooks/useWallletConnectionBSC";

const WalletConnectionBSCSelection = () => {

  const { activate, deactivate, account } = useWeb3React();
  const [showWallet, setShowWallet] = useState(false);
  const walletRef = useRef<any>();
  const handleWallet = () => setShowWallet(!showWallet);

  const activateOnClick = useCallback((): void => {
    activate(useWalletConnectionBSC);
  }, []);

  const aaccountShorter = (value: String | null | undefined) => {
    if (value !== null && value !== undefined) {
      let firstPart: String | undefined = value?.toString().substring(0, 5);
      let secondPart: string | undefined = value?.toString().substring(33);
      return firstPart?.toString() + "..." + secondPart?.toString();
    }
  };

  const copyToClipboard = () => {
    const wallet = account;
    navigator.clipboard.writeText(wallet ?? '');
  };

  return (
    <div>
      <div ref={ walletRef } onClick={ handleWallet } className={ `dshLayout__body--header--right--icon4 ${ aaccountShorter(account) ? 'checked' : '' }` }>
        <MdAccountBalanceWallet />
      </div>
      <Overlay rootClose onHide={ handleWallet } transition={ false } target={ walletRef.current } show={ showWallet } placement="bottom-end">
        { (props) => (
          <div
            { ...props }
            className="dshLayout__body--header--right--listMenu"
          >
            <ListGroup variant="flush">
              { !aaccountShorter(account) ? (
                <ListGroupItem action onClick={ () => activateOnClick() } className="dshLayout__body--header--right--listMenu--item">
                  <img className="dshLayout__body--header--right--listMenu--item--icon" src={ "/assets/images/binance-logo-s.png" } alt="Binance" /> <strong className="formText">Binance wallet</strong>
                </ListGroupItem>
              ) : '' }
              { aaccountShorter(account) ? (
                <ListGroupItem className="dshLayout__body--header--right--listMenu--item checked">
                  <img className="dshLayout__body--header--right--listMenu--item--icon" src={ "/assets/images/binance-logo-s.png" } alt="Binance" />
                  <strong className="formText">Binance wallet</strong>
                  <MdCheckCircle className="dshLayout__body--header--right--listMenu--item--iconCheck" />
                  <InputText
                    disabled
                    name={ 'name' }
                    type={ "number" }
                    placeholder={ aaccountShorter(account) }
                    autoComplete={ "off" } />
                  <img className="dshLayout__body--header--right--listMenu--item--iconButton" src={ "/assets/images/copy-icon.png" } alt="Binance" onClick={ copyToClipboard } />
                </ListGroupItem>
              ) : '' }
              { aaccountShorter(account) ? (
                <ListGroupItem action onClick={ () => deactivate() } className="dshLayout__body--header--right--listMenu--item checked">
                  <MdLogout className="dshLayout__body--header--right--listMenu--item--iconLogout" /> <strong className="formText">Log out</strong>
                </ListGroupItem>
              ) : '' }
            </ListGroup>
          </div>
        ) }
      </Overlay>
    </div >
  );
};

export default WalletConnectionBSCSelection;